import datetime
import tornado as tornado
import tornado.web as web
import tornado.websocket as websocket
import cv2
import os, time
import painter.submit_painting as sp
from sys import platform
from emokit.emotiv import Emotiv
import threading
import numpy as np


WINDOW_SIZE = 250
SD_UPPER_LIMIT = 100
SD_LOWER_LIMIT = 50

STYLE = 0

class EmoWorker:

    def __init__(self):
        threading.Thread(target=self.do_start, name="_gen_").start()
        self.run = True
        self.last_values_list = [0 for i in range(WINDOW_SIZE)]
        self.step_counter = 0
        self.index = 0
        self.emodev = 0

    def set_emodev(self, dev):
        self.emodev = dev

    def update_sensor_values(self, sensors):
        """Write new sensor value to last_values_list."""

        # c(1,2,4,6,8,9)
        new_value = sensors['F3']['value'] + sensors['FC5']['value'] + sensors['F7']['value'] + sensors['P7']['value'] + sensors['O2']['value'] + sensors['P8']['value']

        self.last_values_list[self.index] = new_value
        self.index = (self.index + 1) % WINDOW_SIZE
        self.step_counter += 1

    def get_brain_activity(self):
        """Return value between 0 (bad) and 1(good), based on sensor values."""

        if self.step_counter < WINDOW_SIZE:
            return 0.0

        std = np.std(self.last_values_list, ddof=1) # sample standard deviation

        if std < SD_LOWER_LIMIT:
            return -1.0

        elif std > SD_UPPER_LIMIT:
            return 1.0

        else:
            return 0.0

    def get_brain_imagestyle(self):

        std = np.std(self.last_values_list, ddof=1) # sample standard deviation
 
        # idea: the lower std, the more relaxed the painting,
        # the higher std, the more excited it should be.

        if std < 40:
            return 6

        elif std < 110:
            return 24

        elif std < 180:
            return 26

        else:
            return 21


    def do_start(self):

        with Emotiv(display_output=False, verbose=True) as headset:
            while self.run:

                packet = headset.dequeue()
                if packet is None:
                    continue

                self.update_sensor_values(packet.sensors)

                if self.emodev:
                    self.emodev.write_message("brain:activity:" + str(self.get_brain_activity()))

                STYLE = self.get_brain_imagestyle()

                #data = ",".join([
                #    str(packet.sensors['F3']['value']),
                #    str(packet.sensors['FC5']['value']),
                #    str(packet.sensors['AF3']['value']),
                #    str(packet.sensors['F7']['value']),
                #    str(packet.sensors['T7']['value']),
                #    str(packet.sensors['P7']['value']),
                #    str(packet.sensors['O1']['value']),
                #    str(packet.sensors['O2']['value']),
                #    str(packet.sensors['P8']['value']),
                #    str(packet.sensors['T8']['value']),
                #    str(packet.sensors['F8']['value']),
                #    str(packet.sensors['AF4']['value']),
                #    str(packet.sensors['FC6']['value']),
                #    str(packet.sensors['F4']['value']),
                #    str(packet.sensors['X']['value']),
                #    str(packet.sensors['Y']['value'])
                #])

                time.sleep(0.0001)




class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        emoDev.set_emodev(self)
        print 'new connection'
        #self.write_message("Hi, client: connection is made ...")
        #tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=1), self.test)

    def on_message(self, message):

        img_path = "painter/result_imgs"

        if message == "painter:take":

            camera_success_flag = False

            if platform == "linux" or platform == "linux2":
                print "Taking a snapshot."
                sp.take_image(img_path, sp.SNAPSHOT_ORIG_NAME)
                print "Completed taking a snapshot."
                camera_success_flag = True

            elif platform == "darwin":
                cv2.namedWindow("preview")
                vc = cv2.VideoCapture(0)

                if vc.isOpened(): # try to get the first frame
                    rval, frame = vc.read()
                else:
                    rval = False

                print "Taking a snapshot."
                while rval:
                    cv2.imshow("preview", frame)
                    rval, frame = vc.read()
                    key = cv2.waitKey(20)
                    if key == 27: # exit on ESC
                        if not os.path.exists(img_path):
                            os.makedirs(img_path)
                        cv2.imwrite(os.path.join(img_path, sp.SNAPSHOT_ORIG_NAME), frame)
                        break
                vc.release()
                cv2.destroyAllWindows()
                print "Completed taking a snapshot."
                camera_success_flag = True

            if camera_success_flag:

                # resize and paint
                orig_path = os.path.join(img_path, sp.SNAPSHOT_ORIG_NAME)
                resized_path = os.path.join(img_path, sp.SNAPSHOT_RESIZED_NAME)
                painted_path = os.path.join(img_path, sp.SNAPSHOT_PAINTED_NAME)

                sp.resize_image(orig_path, resized_path)
                sp.paint_image(resized_path, painted_path, STYLE)

                self.write_message("painter:finished")

        else:
            print 'message received: \"%s\"' % message

    def on_close(self):
        emoDev.set_emodev(0)
        print 'connection closed'


if __name__ == "__main__":

    emoDev = EmoWorker()

    app = tornado.web.Application([
        (r'/()', web.StaticFileHandler, {'path': './index.html'}),
        (r'/ws', SocketHandler),
        (r"/design/(.+)", web.StaticFileHandler, {'path': '../design/'}),
        (r"/(.+)", web.StaticFileHandler, {'path': './'})
    ], debug=True)
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()

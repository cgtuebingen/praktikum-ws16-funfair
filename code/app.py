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

from datetime import datetime as dt


WINDOW_SIZE = 250
SD_UPPER_LIMIT = 100
SD_LOWER_LIMIT = 50

STYLE = 45

ROTATE = 0


def clip(value, minValue, maxValue):
    """Clip value in [minValue, maxValue]."""

    return np.amax([minValue, np.amin([maxValue, value])])


def get_fano_factor(value_list):
    """Return Fano factor of values in a time window."""

    std = np.std(value_list, ddof=1) # sample standard deviation
    return (std*std) / np.mean(value_list)


class Sensor:

    def __init__(self, name, minVal, maxVal, window_size, adaptive=False):

        assert(minVal < maxVal), "minVal >= maxVal: not possible"

        self.name = name
        self.minVal = minVal
        self.maxVal = maxVal
        self.window_size = window_size
        self.adaptive = adaptive
        self.last_value = 0.5
        self.last_values_list = [0 for i in range(window_size)]
        self.value_index = 0


    def get_normalized_value(self, unnormalized_value):
        """Return value will be within [0, 1]."""

        val = clip(unnormalized_value, self.minVal, self.maxVal)
        return (val - self.minVal) / (self.maxVal - self.minVal)


    def update_values_list(self, new_value):
        """Update value buffer."""

        if self.adaptive:
            if new_value > self.maxVal:
                self.maxVal = new_value
            elif new_value < self.minVal:
                self.minVal = new_value
        self.last_value =  self.get_normalized_value(new_value)
        self.last_values_list[self.value_index] = self.last_value
        self.value_index = (self.value_index + 1) % self.window_size

    def get_sensor_fano(self):
        return get_fano_factor(self.last_values_list)

    def get_sensor_std(self):
        return np.std(self.last_values_list, ddof=1) # sample standard deviation




class EmoWorker:

    def __init__(self):
        threading.Thread(target=self.do_start, name="_gen_").start()
        self.run = True
        self.last_values_list = [0 for i in range(WINDOW_SIZE)]
        self.step_counter = 0
        self.index = 0
        self.emodev = 0

        self.meaningful_sensor_names = ["F3", "FC5", "AF3", "F7", 
                                        "T7", "P7", "O1", "O2",
                                        "P8", "T8", "F8", "AF4",
                                        "FC6", "F4", "X", "Y"]

        # build list with Sensor object for each sensor
        self.sensorlist = []
        self.sensorlist.append(Sensor("F3", -3241, 4630, WINDOW_SIZE))
        self.sensorlist.append(Sensor("FC5", -1287, 1718, WINDOW_SIZE))
        #self.sensorlist.append(Sensor("AF3", -5911, 7491, WINDOW_SIZE), adaptive=True)
        self.sensorlist.append(Sensor("AF3", -1, 1, WINDOW_SIZE, adaptive=True))
        self.sensorlist.append(Sensor("F7", -2169, -2148, WINDOW_SIZE))
        self.sensorlist.append(Sensor("T7", -531, 2359, WINDOW_SIZE))
        self.sensorlist.append(Sensor("P7", -5026, -2850, WINDOW_SIZE))
        self.sensorlist.append(Sensor("O1", -3734, 3780, WINDOW_SIZE))
        self.sensorlist.append(Sensor("O2", -3763, 2101, WINDOW_SIZE))
        self.sensorlist.append(Sensor("P8", -675, 1473, WINDOW_SIZE))
        self.sensorlist.append(Sensor("T8", -3271, 6340, WINDOW_SIZE))
        self.sensorlist.append(Sensor("F8", 240, 383, WINDOW_SIZE))
        self.sensorlist.append(Sensor("AF4", -3551, 7129, WINDOW_SIZE))
        self.sensorlist.append(Sensor("FC6", -73, 273, WINDOW_SIZE))
        self.sensorlist.append(Sensor("F4", -140, 3, WINDOW_SIZE))
        self.sensorlist.append(Sensor("X", -29, 94, WINDOW_SIZE))
        self.sensorlist.append(Sensor("Y", -11, 56, WINDOW_SIZE))
        self.num_sensors = len(self.sensorlist)


    def set_emodev(self, dev):
        self.emodev = dev

    def update_sensor_values(self, sensors):
        """Write new sensor value to last_values_list."""

        # c(1,2,4,6,8,9)
        new_value = sensors['F3']['value'] + sensors['FC5']['value'] + sensors['F7']['value'] + sensors['P7']['value'] + sensors['O2']['value'] + sensors['P8']['value']


        for i, s in enumerate(self.meaningful_sensor_names):
            self.sensorlist[i].update_values_list(sensors[s]["value"])


        self.last_values_list[self.index] = new_value
        self.index = (self.index + 1) % WINDOW_SIZE
        self.step_counter += 1

    def get_std(self):
        return np.std(self.last_values_list, ddof=1)


    def get_thought(self):
        """E.g. for mastermind game: Return action / 'thought':

        Returns:
           0  ->  no action
           1  ->  shaking of the head
           2  ->  nodding
           3  ->  squint one's eyes
        """

        #return ("%.6f" % self.sensorlist[2].get_sensor_std())
        # shaking of the head
        if self.sensorlist[0].get_sensor_std() > 0.001 and self.sensorlist[1].get_sensor_std() > 0.001:
            return 1

        # nodding
        if self.sensorlist[15].get_sensor_std() > 0.005:
            return 2

        # squint one's eyes
        if self.sensorlist[2].get_sensor_std() > 0.035: #self.sensorlist[11].get_sensor_std() > 0.001:# and :
            return 3 

        return 0


    def get_brain_activity(self):
        """Return value between 0 (bad) and 1(good), based on sensor values."""

        if self.step_counter < WINDOW_SIZE:
            return 0.0

        std = self.get_std()

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
        global STYLE
        global ROTATE

        with Emotiv(display_output=False, verbose=True) as headset:
            while self.run:

                packet = headset.dequeue()
                if packet is None:
                    continue

                self.update_sensor_values(packet.sensors)

                if self.emodev:
                    self.emodev.write_message("brain:activity:" + str(self.get_brain_activity()) + ";" + str(self.get_std()) +";" + str(self.get_thought()))



                STYLE = self.get_brain_imagestyle()

                #ROTATE+= (packet.sensors['F8']['value']-115)/4000.0
                #print str(ROTATE) + " - " + str((packet.sensors['F8']['value']-115)/4000.0)

                # data = ",".join([
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
                #    str(packet.sensors['Y']['value']),
                #    str(dt.now())
                # ])
                #
                # print data

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

                print "Take Style " + str(STYLE)

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

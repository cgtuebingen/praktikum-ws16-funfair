import datetime
import tornado as tornado
import tornado.web as web
import tornado.websocket as websocket
import cv2
import os
import painter.submit_painting as sp
from sys import platform


class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print 'new connection'
        self.write_message("Hi, client: connection is made ...")
        tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=1), self.test)

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
                sp.paint_image(resized_path, painted_path)

                self.write_message("painter:finished")

        else:
            print 'message received: \"%s\"' % message

    def on_close(self):
        print 'connection closed'

    def test(self):
        self.write_message("GOT SENSOR DATA")
        tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=1), self.test)


if __name__ == "__main__":
    app = tornado.web.Application([
        (r'/()', web.StaticFileHandler, {'path': './index.html'}),
        (r'/ws', SocketHandler),
        (r"/design/(.+)", web.StaticFileHandler, {'path': '../design/'}),
        (r"/(.+)", web.StaticFileHandler, {'path': './'})
    ], debug=True)
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()

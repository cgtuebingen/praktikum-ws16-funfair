import datetime
import tornado as tornado
import tornado.web as web
import tornado.websocket as websocket
import cv2
from sys import platform


class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print 'new connection'
        self.write_message("Hi, client: connection is made ...")
        tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=1), self.test)

    def on_message(self, message):

        if message == "painter:take":

            if platform == "linux" or platform == "linux2":
                pass
            elif platform == "darwin":
                cv2.namedWindow("preview")
                vc = cv2.VideoCapture(0)

                if vc.isOpened(): # try to get the first frame
                    rval, frame = vc.read()
                else:
                    rval = False

                while rval:
                    cv2.imshow("preview", frame)
                    rval, frame = vc.read()
                    key = cv2.waitKey(20)
                    if key == 27: # exit on ESC
                        cv2.imwrite('capture.jpg', frame)
                        break
                vc.release()
                cv2.destroyAllWindows()

        else:
            print 'message received: \"%s\"' % message

    def on_close(self):
        print 'connection closed'

    def test(self):
        self.write_message("GOT SENSOR DATAAAAAA")
        tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=1), self.test)


if __name__ == "__main__":
    app = tornado.web.Application([
        (r'/()', web.StaticFileHandler, {'path': './index.html'}),
        (r'/ws', SocketHandler),
        (r"/(.+)", web.StaticFileHandler, {'path': './'})
    ], debug=True)
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()

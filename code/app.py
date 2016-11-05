
import tornado as tornado
import tornado.websocket as websocket
import tornado.ioloop as ioloop
import tornado.web as web
import datetime
import json

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Welcome to the Rummel")

class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print 'new connection'
        self.write_message("Hi, client: connection is made ...")
        tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=1), self.test)

    def on_message(self, message):
        print 'message received: \"%s\"' % message
        self.write_message("Echo: \"" + message + "\"")

    def on_close(self):
        print 'connection closed'

    def test(self):
        self.write_message("GOT SENSOR DATAAAAAA")
        tornado.ioloop.IOLoop.instance().add_timeout(datetime.timedelta(seconds=1), self.test)

if __name__ == "__main__":
    app = tornado.web.Application([
        (r'/', IndexHandler),
        (r'/ws', SocketHandler),
        (r"/(.+)", web.StaticFileHandler, {'path': './'})
    ], debug=True)
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()

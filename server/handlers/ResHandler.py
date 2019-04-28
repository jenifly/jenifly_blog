from tornado.web import StaticFileHandler

class Resources(StaticFileHandler):
  def set_extra_headers(self, path):
    self.set_header("Cache-control", "no-cache")

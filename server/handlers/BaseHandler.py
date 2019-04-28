import json 
import logging

from tornado.web import RequestHandler, StaticFileHandler

class BaseHandler(RequestHandler):
  
  @property
  def db(self):
    return self.application.db
    
  @property
  def redis(self):
    return self.application.redis

  def prepare(self):
    if self.request.headers.get("Content-Type", "").startswith("application/json"):
      if self.request.body:
        self.json_args = json.loads(self.request.body.decode())
    else:
      self.json_args = {}

  def set_default_headers(self):
    self.set_header("Content-Type", "application/json; charset=UTF-8")
    self.set_header("Access-Control-Allow-Origin", "*")
    # self.set_header('Access-Control-Allow-Headers', 'x-requested-with')
    # self.set_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')

  def write_error(self, status_code, **kwargs):
    if status_code  == 405:
      self.redirect('/error?status_code=%s' % str(status_code))

  def isLogin(self):
    return self.get_cookie('j')

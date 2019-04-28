import logging
import hashlib
import config

from handlers.BaseHandler import BaseHandler

def doHashlib(s):
  return str(hashlib.sha256((s + config.passwd_hash_key).encode("utf8")).hexdigest())

class Version(BaseHandler):
  def get(self):
    self.write(dict(version='1.0.1'))

class Token(BaseHandler):
  def post(self):
    pws = dict(pw0='***********', pw1='*********', pw2='******************',)
    if pws == self.json_args['pws']:
      self.set_secure_cookie('j', 't', expires_days=None)
      self.write('1')
    else:
      self.write('0')

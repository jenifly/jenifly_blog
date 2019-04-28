import logging
import hashlib
import config
import json

from urllib.parse import quote
from handlers.BaseHandler import BaseHandler
from utils.CJsonEncoder import CJsonEncoder

class Tools(BaseHandler):
  def post(self):
    self.write(dict(tools=self.db.query('select * from _tools')))
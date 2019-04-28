import logging
import hashlib
import config
import json

from urllib.parse import quote
from handlers.BaseHandler import BaseHandler
from utils.CJsonEncoder import CJsonEncoder

class Index(BaseHandler):
  def get(self):
    self.xsrf_token
    with open(config.res_path+'index.json', "r", encoding="utf-8") as f:
      self.write(quote(f.read()))

class Tags(BaseHandler):
  def post(self):
    if self.json_args['m'] == 0:
      self.write(json.dumps(dict(tags=self.db.query('select _id, _text, _count from _tags order by _count DESC'), a=self.db.query('select * from _article a where (select count(*) from _article b where a._tag=b._tag and a._watch<b._watch) < 3 and a._tag in (select * from(select _text from _tags order by _count desc LIMIT 4) c) order by a._watch desc')),cls=CJsonEncoder))
    if self.json_args['m'] == 1:
      try:
        self.write(dict(id=self.db.insert('insert into _tags set _text=%s', self.json_args['t'])))
      except Exception as e:
        logging.error(e)
        self.write(dict(msg=0))
    if self.json_args['m'] == 2:
      self.write(json.dumps(dict(count=self.db.get('select count(*) c from _article where _tag="%s"'%self.json_args['tag']), a=self.db.query('select * from _article where _tag="%s" order by _%s desc limit %s'%( self.json_args['tag'], self.json_args['order'], self.json_args['limit']))), cls=CJsonEncoder))

class Upload(BaseHandler):
  def post(self):
    try:
      file_metas = self.request.files
      article = json.loads(self.get_argument('article'))
      mdSter = self.get_argument('mdSter')
      a = str(self.db.insert('insert into _article (_title,_tag,_abstract,_pics,_uid) value (%s,%s,%s,%s,%s)', article['title'], article['tag'], article['abstract'], article['pics'], article['uid']))
      for k,v in file_metas.items():
        filename = v[0]['filename']
        path = config.res_path+'images/'
        name = a+'-'+k+'.'+filename.split('.')[-1]
        mdSter = mdSter.replace('![%s](%s)'%(filename,k),'![%s](%s)'%(filename,'images/'+name))
        with open(path+name, 'wb') as up:
          up.write(v[0]['body'])
      with open(config.res_path+'md/'+a+'.md', 'wb') as up:
        up.write(bytes(mdSter, encoding='utf8'))
      self.db.execute('update _tags set _count=_count+1 where _text=(select _tag from _article where _id=%s)'%a)
      self.write(dict(id=a))
    except Exception as e:
      logging.error(e)
      self.write(dict(msg=0))


class Article(BaseHandler):
  def post(self):
    if self.json_args['m'] == 0:
      self.write(json.dumps(dict(a=self.db.query('select * from _article order by _%s desc limit %s'%(self.json_args['t'], self.json_args['l'])),c=self.db.get('select count(*) c from _article')), cls=CJsonEncoder))
    if self.json_args['m'] == 1:
      try:
        self.db.execute('update _article set _watch=_watch+1 where _id=%s'%self.json_args['id'])
        article = self.db.get('select _title,_tag,_uid,_watch,_utime,_uid from _article where _id=%s', self.json_args['id'])
        with open(config.res_path+'/md/%s.md'%self.json_args['id'], "r", encoding="utf-8") as f:
          article['_content'] = f.read()
          self.write(json.dumps(article, cls=CJsonEncoder))
      except Exception as e:
        logging.error(e)
        self.write(dict(msg=0))


import orjson
import os

from handlers import ApiHandler
from utils.commons import required_login
from config import file_server, article_path, imgages_path


class ArticleHandler(ApiHandler):
    route = r'/api/article/?(list|\d+)?'

    async def get(self, active):
        if active == 'list':
            _type = self.get_argument('t', None)
            limit = self.get_argument('l', 10)
            if _type:
                sql = 'SELECT id, title, tag, abstract, watch, uid, utime from article order by %s desc limit 0,' + str(limit)
                return self.write({'time': await self.mysql.queryall(sql%'utime'), 'watch': await self.mysql.queryall(sql%'watch')})
            order = self.get_argument('o', 'utime')
            start = self.get_argument('s', 0)
            count = self.get_argument('c', None)
            sql = f"SELECT id, title, tag, abstract, watch, uid, utime from article order by {order} desc limit {start}, {limit}"
            data = {'data': await self.mysql.queryall(sql, cache=False)}
            if count is not None:
                total = await self.mysql.queryone('SELECT count(*) count from article', cache=False)
                data['total'] = total['count']
            self.write(data)
        elif active == None:
            _id = self.get_argument('id', None)
            if not _id or not _id.isdigit():
                return self.write(4004)
            try:
                affect = await self.mysql.update(f'UPDATE article SET watch=watch+1 WHERE id={_id}')
                if affect:
                    self.redirect(f'{file_server}/res/article/{_id}.md')
                else:
                    self.write(4005)
            except:
                self.write(4002)
        else:
            article = await self.mysql.queryone(f'select * from article where id = {active}')
            self.write(article if article else 4005)

    @required_login
    async def post(self, active):
        try:
            file_metas = self.request.files
            article = orjson.loads(self.get_argument('article'))
            article['uid'] = self.current_user.id
            mdSter = self.get_argument('mdSter')
            _id = self.mysql.insert('insert into article (title, tag, abstract, pics, uid) value ({title},{tag},{abstract},{pics},{uid})'.format(**article))
            for k,v in file_metas.items():
                filename = v[0]['filename']
                path = config.res_path+'images/'
                name = f'{_id}-{k}.{filename.split(".")[-1]}'
                mdSter = mdSter.replace(f'![{filename}]({k})', f'![{filename}]({images}/{name})')
                with open(path + name, 'wb') as up:
                    up.write(v[0]['body'])
            with open(os.path.join(article_path, f'{_id}.md'), 'wb') as up:
                up.write(bytes(mdSter, encoding='utf8'))
            self.mysql.update(f'update tags set count=count+1 where text=(select tag from article where id=%{_id}')
            self.write(dict(id=_id))
        except Exception as e:
            logging.error(e)
            self.write(4302)

    @required_login
    async def put(self, active):
        pass

    @required_login
    async def patch(self, active):
        pass

    @required_login
    async def delete(self, active):
        pass
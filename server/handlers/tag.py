from handlers import ApiHandler
from utils.commons import required_login

class TagHanlder(ApiHandler):
    route = r'/api/tag/?([^/]*)'

    async def get(self, active):
        tags = await self.mysql.queryall('SELECT id, text, count from tags order by count desc', cache=False)
        articles = await self.mysql.queryall("select id, title, tag, abstract, watch, uid, utime from article a where (select count(*) from article b where a.tag=b.tag and a.watch<b.watch) < 3 and a.tag in (select * from(select text from tags order by count desc LIMIT 4) c) order by a.watch desc", cache=False)
        self.write({'tags': tags, 'articles': articles})
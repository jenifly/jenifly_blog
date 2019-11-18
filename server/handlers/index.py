import orjson

from handlers import ApiHandler
from utils.commons import required_login
from utils.cache import cache
from config import index_path

class IndexHanlder(ApiHandler):
    route = '/api/index'

    async def get(self, active=None):
        if not hasattr(cache, 'index'):
            with open(index_path, mode='r') as f:
                cache.index = orjson.loads(f.read())
        self.write({'data': cache.index})

    @required_login
    async def post(self, activee=None):
        pass

    @required_login
    async def put(self, activee=None):
        pass

    @required_login
    async def patch(self, activee=None):
        pass

    @required_login
    async def delete(self, activee=None):
        pass
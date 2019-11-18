from handlers import ApiHandler
from utils.commons import required_login

class ToolsHandler(ApiHandler):
    route = r'/api/tools'

    async def get(self):
        self.write({'tools': await self.mysql.queryall('select * from tools', cache=True)})

    @required_login
    async def post(self):
        pass

    @required_login
    async def update(self):
        pass

    @required_login
    async def delete(self):
        pass
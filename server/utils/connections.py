from config import mysql_options, redis_options

class Connections:

    async def initialize(self):
        self.mysql_pool = await aiomysql.create_pool(**mysql_options)
        self.redis = await aioredis.create_redis_pool(**redis_options)

    async def mysql_execute(sql, single=False):
        async with self.mysql_pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(sql)
                return await cur.fetchone() if single else await cur.fetchall()
                
conn = Connections()
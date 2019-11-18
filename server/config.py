import os

# Application
settings = dict(
    cookie_secret='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    compiled_template_cache=False,
    xsrf_cookies=True,
    debug=True,
)

# mysql
mysql_options = dict(
    host='127.0.0.1',
    db='blog',
    user='xxxxxxxxxxx',
    password='xxxxxxxxxx',
    charset="utf8"
)

# redis
redis_options = dict(
    address=('127.0.0.1', 6379),
    password='xxxxxxxxxxx'
)

# path
path = '/home/jy/app/blog/dist'
ufiles_path = os.path.join(path, 'ufiles')
res_path = os.path.join(path, 'res')
article_path = os.path.join(res_path, 'article')
imgages_path = os.path.join(res_path, 'imgages')
tools_path = os.path.join(res_path, 'tools')
index_path = os.path.join(res_path, 'index.json')

# file server
file_server = 'http://jenifly.xyz:9926'

# log
log_path = os.path.join(os.path.dirname('__file__'), 'logs/log')
log_level = 'error'

# Cryptographic key
PASSWD_HASH_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

# IMG_CODE
IMG_CODE_EXPIRES_SECONDS = 90
IMG_CODE_WIDTH = 200
IMG_CODE_HEIGHT = 75

# session
SESSION_PREFIX = 'blog_s_'
SESSION_EXPIRES_SECONDS = 2592000
SEESION_HASH_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
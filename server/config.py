import os

# Application
settings = {
  'cookie_secret': 'Qiyp+qz+Eeir9uDVXmfHz0Isqfus/hHos7Dg1V5nx88=',
  'xsrf_cookies': True,
  'debug': True,
}

# mysql
mysql_options = dict(
  host='127.0.0.1',
  database='jenifly_blog',
  user='root',
  password='jenifly0.1',
  charset="utf8",
  time_zone='+8:00'
)

# log
log_path = os.path.join(os.path.dirname(__file__), 'logs/log/')
log_level = 'debug'

# res
res_path = os.path.join(os.path.dirname(__file__), 'res/')

# key
passwd_hash_key = 'dFeaFw3JR3Cp4gBkL9Tmo62rY+3mx06zpx3NlVAapbQ='

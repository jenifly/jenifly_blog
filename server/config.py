import os

# Application
settings = {
  'cookie_secret': '**********************************',
  'xsrf_cookies': True,
  'debug': True,
}

# mysql
mysql_options = dict(
  host='localhost',
  database='*************',
  user='*****',
  password='*****',
  charset="utf8",
  time_zone='+8:00'
)

# log
log_path = os.path.join(os.path.dirname(__file__), 'logs/log/')
log_level = 'debug'

# res
res_path = os.path.join(os.path.dirname(__file__), 'res/')

# key
passwd_hash_key = '********************************'

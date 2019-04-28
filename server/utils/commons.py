import functools

from utils.response_code import RET

def required_login(fun):
  # 保证被装饰的函数对象的__name__不变
  @functools.wraps(fun)
  def wrapper(request_handler_obj, *args, **kwargs):
    # 调用get_current_user方法判断用户是否登录
    if request_handler_obj.isLogin():
      fun(request_handler_obj, *args, **kwargs)
    else:
      request_handler_obj.write(dict(msgcode=RET.SESSIONERR, msg="请先登录！"))
  return wrapper






















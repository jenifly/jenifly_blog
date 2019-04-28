from handlers.PassportHandler import PassportUrl
from handlers.MainHandler import MainUrl
from handlers.ResHandler import Resources

handlers = [(r"/images/(.*)", Resources, {"path": r"res/images/"}),
(r"/tools/(.*)", Resources, {"path": r"res/tools/"}),]

handlers += MainUrl.handlers
handlers += PassportUrl.handlers

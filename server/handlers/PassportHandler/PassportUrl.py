from . import Passport

handlers = [
  (r"/api/version", Passport.Version),
  (r"/api/token", Passport.Token),
]

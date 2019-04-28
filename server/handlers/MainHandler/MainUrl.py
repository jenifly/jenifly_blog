from . import Article, Tools

handlers = [
  (r"/api/index", Article.Index),
  (r"/api/tags", Article.Tags),
  (r"/api/ula", Article.Upload),
  (r"/api/article", Article.Article),
  (r"/api/tools", Tools.Tools),
]

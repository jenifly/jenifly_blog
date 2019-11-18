import commons from '@/utils/commons'
import router from '@/router'

const getters = {
  homepage: state => state.homepage.homepage,
  alist: state => {
    if (state.article.order == 'utime')
      return commons.formatArticles(state.article.alist)
    else
      return state.article.alist
  },
  olist: state => state.article.olist,
  total: state => state.article.total,
  article: state => {
    state.article.cur_article.content = state.article.article
    return state.article.cur_article
  },
  order: state => state.article.order,
  Colors: state => state.app.colors,
  tag: state => {
    if (!state.tag.tag)
      return false
    state.tag.tag.articles = commons.formatTagsArticles(state.tag.tag.articles)
    return state.tag.tag
  },
}

export default getters

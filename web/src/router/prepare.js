import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import '@/assets/themes/nprogress.scss'

const title = "Jenifly's blog"

router.beforeEach(async (to, from, next) => {
  console.log(to, from)
  NProgress.start()
  document.title = to.meta.title || title

  switch (to.name) {
    case 'index':
      if (!store.getters.homepage)
        await store.dispatch('homepage/get')
      break
    case 'main':
      if (!store.getters.alist) 
        await store.dispatch('article/list')
      break
    case 'article':
      if (!to.query.id)
        return next('/error?status_code=405')
      if (!store.state.article.cur_article)
        await store.dispatch('article/getinfo', to.query.id)
      if (!store.getters.tag)
        await store.dispatch('tag/get')
      if (!store.getters.olist)
        await store.dispatch('article/olist', {l: 5})
      await store.dispatch('article/get', to.query)
      break
    case 'tags':
      if (!store.getters.tag)
        await store.dispatch('tag/get')
      break
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
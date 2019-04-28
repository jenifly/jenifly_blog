import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './assets/themes/style.scss'
import Util from '../src/util'

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

Vue.config.productionTip = false
Vue.prototype.Util = Util
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

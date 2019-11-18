import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import homepage from './modules/homepage'
import article from './modules/article'
import tag from './modules/tag'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    homepage,
    article,
    tag
  },
  getters
})

export default store
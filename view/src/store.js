import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    index: false,
    token: false,
    tags: false,
    Colors: {},
    tagsArticle: false,
    article: false,
    articleTime: false,
    articleWatch: false,
    tools: false
  },
  getters: {
    getToken: state => state.token,
    getTags: (state, count) => count ? state.tags : state.tags.slice(0, count)
  },
  mutations: {
    mSetIndex: (state, data) => state.index = data,
    mSetTags: (state, data) => state.tags = data,
    mSetTagsArticle: (state, data) => state.tagsArticle = data,
    mSetArticleTime: (state, data) => state.articleTime = data,
    mSetArticleWatch: (state, data) => state.articleWatch = data,
    mSetTools: (state, data) => state.tools = data
  },
  actions: {
    setIndex (context) {
      this._vm.Util.request.doGet('api/index',(res)=>{
        context.commit('mSetIndex', JSON.parse(decodeURIComponent(res)))
      })
    },
    setTags (context) {
      this._vm.Util.request.doPost('api/tags',{m:0},(res)=>{
        context.commit('mSetTags', res.tags)
        context.commit('mSetTagsArticle', this._vm.Util.commons.formatTagsArticles(res.a))
      }, error=>console.log(error))
    },
    setArticleTime (context, limit) {
      this._vm.Util.request.doPost('api/article',{m:0,t:'utime',l:limit+''},(res)=>{
        context.commit('mSetArticleTime', this._vm.Util.commons.formatArticlesWT(res.a))
      }, error=>console.log(error))
    },
    setArticleWatch (context, limit) {
      this._vm.Util.request.doPost('api/article',{m:0,t:'watch',l:limit+''},(res)=>{
        context.commit('mSetArticleWatch', this._vm.Util.commons.formatArticlesWT(res.a))
      }, error=>console.log(error))
    },
    setTools (context) {
      this._vm.Util.request.doPost('api/tools',{},(res)=>{
        context.commit('mSetTools', res.tools)
      }, error=>console.log(error))
    }
  }
})
import { list, get, getinfo } from '@/api/article'
import commons from '@/utils/commons'

const state = {
  alist: false,
  order: 'utime',
  article: '',
  total: -1,
  cur_article: false,
  olist: false,
}

const mutations = {
  SET_ALIST: (state, alist) => {
    state.alist = alist
  },
  SET_OLIST: (state, olist) => {
    state.olist = olist
  },
  SET_TOTAL: (state, total) => {
    state.total = total
  },
  SET_ORDER: (state, order) => {
    state.order = order
  },
  SET_ARTICLE: (state, article) => {
    state.article = article
  },
  SET_CUR_ARTICLE: (state, article) => {
    state.cur_article = article
  }
}

const actions = {
  list({ state, commit }, params) {
    return new Promise((resolve, reject) => {
      params = params || {}
      if (state.total == -1)
        params.c = Math.random().toString(36).substr(2,4)
      list(params).then(response => {
        const { data } = response
        commit('SET_ALIST', data)
        if (response.total)
        commit('SET_TOTAL', response.total)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  list({ state, commit }, params) {
    return new Promise((resolve, reject) => {
      params = params || {}
      if (state.total == -1)
        params.c = Math.random().toString(36).substr(2,4)
      list(params).then(response => {
        const { data } = response
        commit('SET_ALIST', data)
        if (response.total)
        commit('SET_TOTAL', response.total)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  olist({ state, commit }, params) {
    return new Promise((resolve, reject) => {
      params = params || {}
      params.t = Math.random().toString(36).substr(2,4)
      list(params).then(response => {
        delete response.stauts
        response.time = commons.formatArticlesWT(response.time)
        response.watch = commons.formatArticlesWT(response.watch)
        commit('SET_OLIST', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  get({ commit }, params) {
    return new Promise((resolve, reject) => {
      get(params).then(response => {
        commit('SET_ARTICLE', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getinfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      getinfo(id).then(response => {
        delete response.state
        response.watch += 1
        commit('SET_CUR_ARTICLE', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

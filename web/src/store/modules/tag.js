import { get } from '@/api/tag'

const state = {
  tag: false,
}

const mutations = {
  SET_TAG: (state, tag) => {
    state.tag = tag
  }
}

const actions = {
  get({ commit }) {
    return new Promise((resolve, reject) => {
      get().then(response => {
        const {articles, tags} = response
        commit('SET_TAG', {articles, tags})
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

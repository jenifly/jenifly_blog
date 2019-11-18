import { get } from '@/api/homepage'

const state = {
  homepage: false,
}

const mutations = {
  SET_HOMEPAGE: (state, homepage) => {
    state.homepage = homepage
  }
}

const actions = {
  get({ commit }) {
    return new Promise((resolve, reject) => {
      get().then(response => {
        const { data } = response
        commit('SET_HOMEPAGE', data)
        resolve(data)
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

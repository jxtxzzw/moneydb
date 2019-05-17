import Vue from 'vue'
import router from '../../router'
import { API_URL } from "../../../data/config"

export default {
  name: 'Auth',
  namespaced: true,
  state: {
    loginStatus: false
  },
  mutations: {
    changeLoginStatus(state, {result}) {
      state.login = result
    }
  },
  actions: {
    async check ({commit}) {
      const result = await Vue.prototype.$http.get(API_URL + '/auth').then(data => data.data)
      if (!result) {
        router.push({name: 'loginStatus'})
        return
      }
      commit('changeLoginStatus', {result})
    }
  }
}

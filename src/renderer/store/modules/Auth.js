// import Vue from 'vue'
// import router from '../../router'
// import { API_URL } from '../../../data/config'

export default {
  state: {
    isLogin: false
  },
  mutations: {
    changeLoginStatus (state, {result}) {
      state.isLogin = result
    },
    setLoginStatus (state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    // async check ({commit}) {
    //   const result = await Vue.prototype.$http.get(API_URL + '/auth').then(data => data.data)
    //   if (!result) {
    //     router.push({name: '/PackageManage'})
    //     return
    //   }
    //   commit('changeLoginStatus', {result})
    // },
    logout ({commit}) {
      commit('setLoginStatus', false)
    },
    login ({commit}) {
      commit('setLoginStatus', true)
    }
  }
}

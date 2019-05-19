export default {
  state: {
    isLogin: false
  },
  mutations: {
    setLoginStatus (state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    logout ({commit}) {
      commit('setLoginStatus', false)
    },
    login ({commit}) {
      commit('setLoginStatus', true)
    }
  }
}

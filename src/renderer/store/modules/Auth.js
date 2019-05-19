export default {
  state: {
    token: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    login ({commit}, token) {
      commit('setToken', token)
    },
    logout ({commit}) {
      commit('setToken', '')
    }
  }
}

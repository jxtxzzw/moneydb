import Vue from 'vue'
import router from '../router';
export default{
  name: 'profile',
  namespaced: true,
  state:{
    login :false
  },
  mutations:{
    changeLogin(state,{result}){
      state.login = result;
    }
  },
  actions:{
    async checkMe({commit}){
      const result = await Vue.prototype.$http.get('/profile').then(data=>data.data);
      if(!result){
        router.push({name:'login'})
        return
      }
      commit('changeLogin',{result})
    }
  }
}

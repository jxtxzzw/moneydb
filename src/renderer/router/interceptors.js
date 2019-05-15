import axios from 'axios';
import url from 'url';
import router from './'
var instance = axios.create({
  baseURL: '/api'
});

//拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },function (error) {
    //敏感接口.如果没有session跳转登录界面
    if(error.response.status === 403){
      router.push({name: "login"})
    }
  })

export default instance;

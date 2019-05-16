import axios from 'axios'
import router from './'
const axiosInterceptor = axios.create()

// 拦截器
axiosInterceptor.interceptors.response.use(
  function (response) {
    return response
  }, function (error) {
    console.log('error in interceptor')
    // 敏感接口.如果没有session跳转登录界面
    if (error.response.status === 403) {
      router.push({name: 'Login'})
    }
  })

export default axiosInterceptor

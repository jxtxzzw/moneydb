import axios from 'axios'
import router from './'
const axiosInterceptor = axios.create()

// 拦截器
axiosInterceptor.interceptors.response.use(
  function (response) {
    // 如果拦截到的请求是成功的，直接让请求通过
    return response
  }, function (error) {
    // 敏感接口，如果没有授权就跳转登录界面
    if (error.response.status === 403) {
      router.push({name: 'PackageManage'})
    }
  })

export default axiosInterceptor

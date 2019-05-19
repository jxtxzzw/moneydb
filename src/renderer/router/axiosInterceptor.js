import axios from 'axios'
import router from './'
const axiosInterceptor = axios.create()

// axios拦截器
// 拦截请求，给所有的请求都带上token
axios.interceptors.request.use(request => {
  const JWTToken = window.localStorage.getItem('JWTToken')
  if (JWTToken) {
    // 此处有坑，下方记录
    request.headers['Authorization'] = `Bearer ${JWTToken}`
  }
  return request
})

// 拦截响应，遇到token不合法则报错
axios.interceptors.response.use(
  response => {
    if (response.data.token) {
      console.log('token:', response.data.token)
      window.localStorage.setItem('jxtxzzw_jwt_token', response.data.token)
    }
    return response
  },
  error => {
    const errRes = error.response
    if (errRes.status === 401) {
      window.localStorage.removeItem('jxtxzzw_jwt_token')
      // swal('Auth Error!', `${errRes.data.error.message}, please login!`, 'error')
        .then(() => {
          router.push('/Login')
        })
    }
    return Promise.reject(error.message) // 返回接口返回的错误信息
  })

// 拦截器
// axiosInterceptor.interceptors.response.use(
//   function (response) {
//     // 如果拦截到的请求是成功的，直接让请求通过
//     return response
//   }, function (error) {
//     // 敏感接口，如果没有授权就跳转登录界面
//     if (error.response.status === 403) {
//       router.push({name: 'landing-page'})
//     }
//   })

export default axiosInterceptor

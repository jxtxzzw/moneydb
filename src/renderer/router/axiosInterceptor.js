import axios from 'axios'
import router from './'
import store from '../store/'

const axiosInterceptor = axios.create()
// const _this = this

// axios拦截器
// 拦截请求，给所有的请求都带上token
axiosInterceptor.interceptors.request.use(request => {
  const token = store.state.Auth.token
  // const JWTToken = window.localStorage.getItem('jxtxzzw_jwt_token')
  const JWTToken = token
  if (JWTToken) {
    // 此处有坑，下方记录
    request.headers['Authorization'] = `Bearer ${JWTToken}`
  }
  return request
})

// 拦截响应，遇到token不合法则报错
axiosInterceptor.interceptors.response.use(
  response => {
    if (response.data.token) {
      store.dispatch('login', response.data.token)
      // window.localStorage.setItem('jxtxzzw_jwt_token', response.data.token)
    } else {
    }
    return response
  },
  error => {
    const errRes = error.response
    if (errRes.status === 401) {
      store.dispatch('logout')
      // window.localStorage.removeItem('jxtxzzw_jwt_token')
      //   .then(() => {
      router.push('/Login')
      // })
    } else {
      console.log('else')
    }
    return Promise.reject(error.message) // 返回接口返回的错误信息
  }
)

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

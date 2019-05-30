import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/MockFilterTable',
      name: 'MockFilterTable',
      component: require('@/components/MockFilterTable').default
    },
    {
      path: '/Accounts',
      name: 'Accounts',
      component: require('@/components/Accounts').default
    },
    {
      path: '/TestPage',
      name: 'TestPage',
      component: require('@/components/TestPage').default
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: require('@/components/Profile').default
    },
    {
      path: '/sensitive',
      name: 'sensitive',
      component: require('@/components/SensitiveTest').default
    },
    {
      path: '/Login',
      name: 'Login',
      component: require('@/components/Login').default
    },
    {
      path: '/PackageModify/:id',
      name: 'PackageModify',
      component: require('@/view/PackageModify').default
    },
    {
      path: '/PackageManage',
      name: 'PackageManage',
      component: require('@/view/PackageManage').default
    },
    {
      path: '/StaffManage',
      name: 'StaffManage',
      component: require('@/view/StaffManage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// 每一个路由之前都做一次检验，除非是登录页面或者主页，其他页面都要触发一个权限检查
router.beforeEach(async (to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'landing-page') {
    Vue.http.post('http://127.0.0.1:3000/User/Auth', {
      username: '1',
      password: '1',
      from: from.name,
      to: to.name
    })
      .then(
        response => {
          if (response.data.token) {
            console.log('token:', response.data.token)
            window.localStorage.setItem('jxtxzzw_jwt_token', response.data.token)
          } else {
            console.log('11111')
          }
          return response
        },
        error => {
          const errRes = error.response
          if (errRes.status === 401) {
            window.localStorage.removeItem('jxtxzzw_jwt_token')
            router.push('/Login')
          } else if (errRes.status === 403) {
            console.log('else')
            // 跳转到没有权限的页面
          }
          return Promise.reject(error.message) // 返回接口返回的错误信息
        }
      )
      .catch(e => {
        console.log(e)
      })
  }
  console.log('确认存活')
  next()
})

export default router

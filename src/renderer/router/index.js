import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: require('@/components/LandingPage/Welcome').default
    },
    {
      path: '/TrackingCheckpoint',
      name: 'TrackingCheckpoint',
      component: require('@/view/TrackingCheckpoint').default
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
      path: '/WareHouseModify/:id',
      name: 'WareHouseModify',
      component: require('@/view/WareHouseModify').default
    },
    {
      path: '/WareHouseManage',
      name: 'WareHouseManage',
      component: require('@/view/WareHouseManage').default
    },
    {
      path: '/EmployeeManage',
      name: 'EmployeeManage',
      component: require('@/view/EmployeeManage').default
    },
    {
      path: '/EmployeeModify/:id',
      name: 'EmployeeModify',
      component: require('@/view/EmployeeModify').default
    },
    {
      path: '/DispatchingView',
      name: 'DispatchingView',
      component: require('@/view/DispatchingView').default
    },
    {
      path: '/UserQuery',
      name: 'UserQuery',
      component: require('@/view/UserQuery').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// 每一个路由之前都做一次检验，除非是登录页面或者主页，其他页面都要触发一个权限检查
router.beforeEach(async (to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Welcome' && to.name !== 'UserQuery' && to.name !== 'Tracking') {
    Vue.http.post('http://127.0.0.1:3000/User/Auth', {
      from: from.name,
      to: to.name
    })
      .then(
        response => {
          if (response.data.token) {
            this.$store.dispatch('login', response.data.token)
          }
          return response
        },
        error => {
          const errRes = error.response
          if (errRes.status === 401) {
            this.$store.dispatch('logout')
            router.push('/Login')
          } else if (errRes.status === 403) {
            console.log('jump to 403')
            // 跳转到没有权限的页面
          }
          return Promise.reject(error.message) // 返回接口返回的错误信息
        }
      )
      .catch(e => {
        console.log(e)
      })
  }
  next()
})

export default router

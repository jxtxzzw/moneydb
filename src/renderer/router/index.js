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
    Vue.http.post('http://127.0.0.1:3000/auth', {
      username: '1',
      password: '1',
      from: from.name,
      to: to.name,
      privilege: 'Login'
    })
    // .then() 如果是 403 就会被拦截器重定向，所以这里如果能收到 res 就一定是被拦截器通过了，所以直接next
  }
  next()
})

export default router

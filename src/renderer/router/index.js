import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

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
      path: '*',
      redirect: '/'
    }
  ]
})

// 每一个路由之前都做一次检验，除非是登录页面或者主页，其他页面都要触发一个权限检查
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'index') {
    store.dispatch('Auth/check')
  }
  next()
})

export default router

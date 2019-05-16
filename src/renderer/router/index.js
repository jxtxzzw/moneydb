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

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'index') {
    console.log('router.beforeEach()')
    store.dispatch('Profile/checkMe')
  }
  next()
})

export default router

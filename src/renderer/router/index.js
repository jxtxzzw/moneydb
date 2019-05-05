import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
      path: '*',
      redirect: '/'
    }
  ]
})

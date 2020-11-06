import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/modules/Dashboard'
import SignIn from '@/modules/SignIn'
import About from '@/modules/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      get component () {
        if (sessionStorage.getItem('token')) {
          return Dashboard
        } else {
          return SignIn
        }
      },
      meta: { transitionName: 'fade' }
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn,
      meta: { transitionName: 'fade' }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Dashboard,
      meta: { transitionName: 'fade' }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { transitionName: 'fade' }
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/modules/Dashboard'
import AuthCallback from '@/modules/AuthCallback'
import SignIn from '@/modules/SignIn'
import About from '@/modules/About'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/oauth/discord',
      name: 'AUTH',
      component: AuthCallback
    },
    {
      path: '/',
      name: 'Dashboard',
      beforeEnter (to, from, next) {
        if (store.state.user && store.state.user.id) {
          next()
        } else {
          next('/signin')
        }
      },
      component: Dashboard,
      meta: { transitionName: 'fade' }
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn,
      beforeEnter (to, from, next) {
        if (store.state.user && store.state.user.id) {
          next('/')
        } else {
          next()
        }
      },
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

// router.beforeEach((to, from, next) => {
//   console.log(to, from)
// })

export default router

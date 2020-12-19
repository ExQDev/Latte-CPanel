import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import DrawerLayout from 'vue-drawer-layout'
import App from './App'
import router from './router'
import store from './store'

const socket = io('http://localhost:800')

Vue.use(DrawerLayout)
Vue.use(VueSocketIOExt, socket)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

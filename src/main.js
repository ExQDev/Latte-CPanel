import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io('http://localhost')

Vue.use(VueSocketIOExt, socket)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

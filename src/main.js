import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import DrawerLayout from 'vue-drawer-layout'
import VEmojiPicker from 'v-emoji-picker'
import VueModal from '@kouts/vue-modal'
import vClickOutside from 'v-click-outside'
import VueTable from 'vue-sorted-table'
import Textfield from '@/components/TextField'
import App from './App'
import socket from './socket'
import router from './router'
import store from './store'
import '@kouts/vue-modal/dist/vue-modal.css'

Vue.use(DrawerLayout)
Vue.use(VEmojiPicker)
Vue.use(vClickOutside)
Vue.use(VueTable)
Vue.component('Modal', VueModal)
Vue.component('Textfield', Textfield)
Vue.use(VueSocketIOExt, socket)
Vue.config.productionTip = false

// Vue.directive('click-outside', {
//   bind: function (el, binding, vnode) {
//     el.clickOutsideEvent = function (event) {
//       // here I check that click was outside the el and his children
//       // eslint-disable-next-line eqeqeq
//       if (!(el == event.target || el.contains(event.target))) {
//         // and if it did, call method provided in attribute value
//         vnode.context[binding.expression](event)
//       }
//     }
//     document.body.addEventListener('click', el.clickOutsideEvent)
//   },
//   unbind: function (el) {
//     document.body.removeEventListener('click', el.clickOutsideEvent)
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

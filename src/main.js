import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import DrawerLayout from 'vue-drawer-layout'
import VEmojiPicker from 'v-emoji-picker'
import VueModal from '@kouts/vue-modal'
import vClickOutside from 'v-click-outside'
import VueTable from 'vue-sorted-table'
import Divider from '@/components/Divider'
import Textfield from '@/components/TextField'
import VButton from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Checkbox from '@/components/Checkbox'
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
Vue.component('Divider', Divider)
Vue.component('v-button', VButton)
Vue.component('Dropdown', Dropdown)
Vue.component('checkbox', Checkbox)
Vue.use(VueSocketIOExt, socket)
Vue.config.productionTip = false
Vue.prototype.$subscriptions = {
  Triggers: false,
  Music: false,
  App: false,
  Dashboard: false,
  DashboardHome: false,
  TriggerEditor: false
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

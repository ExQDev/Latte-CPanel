import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      _id: null,
      id: null,
      avatar: null,
      discriminator: null,
      email: null,
      flags: null,
      locale: null,
      mfa_enabled: false,
      public_flags: null,
      token: null,
      username: null,
      verified: false,
      accessToken: null,
      tokenType: null
    }
  },
  mutations: {
    setUser (state, paylaod) {
      state.user = paylaod
    }
  },
  actions: {
    auth ({commit}, user) {
      commit('setUser', user)
    },
    deauth ({commit}) {
      commit('setUser', null)
    }
  },
  plugins: [new VuexPersistence().plugin]
})

export default store

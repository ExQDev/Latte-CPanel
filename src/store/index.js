import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import socket from '../socket'
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
    },
    guilds: [],
    callbacks: [],
    currentGuild: {
      id: null,
      icon: null,
      name: null
    },
    page: null
  },
  mutations: {
    setUser (state, paylaod) {
      state.user = paylaod
    },
    setGuilds (state, payload) {
      state.guilds = payload
    },
    setCurrentGuild (state, payload) {
      state.currentGuild = payload
    },
    setPage (state, payload) {
      state.page = payload
    },
    setCallbacks (state, payload) {
      state.callbacks = payload
    },
    pushBackCallback (state, payload) {
      state.callbacks.push(payload)
    }
  },
  actions: {
    auth ({commit}, user) {
      commit('setUser', user)
    },
    deauth ({commit}) {
      commit('setUser', null)
    },
    setCurrentGuild ({commit}, guild) {
      commit('setCurrentGuild', guild)
      socket.emit('action', {
        method: 'getTriggers',
        guild: guild.id
      })
    }
  },
  plugins: [new VuexPersistence().plugin]
})

export default store

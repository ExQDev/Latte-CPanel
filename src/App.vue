<template>
  <div id="app">
    <modal @setModal="setModal">
      <fixed-header>
        <div class="navbar">
          <div class="logo" @click="modal.show('Test', 'This is a test modal')">
            <h1><img src="./assets/favicon.png" width="54" height="54"/> Latte CPanel</h1>
          </div>
          <div class="menu">
            <div class="menu-items">
              <!-- <textfield class="search-field" id="searchbox" :icon="SearchIcon" type="text" :oninput="onSearchInput"/> -->
              <router-link v-if="signedIn" to="/">Store</router-link>
              <router-link v-if="signedIn" to="/profile">Profile</router-link>
              <router-link to="/about">About</router-link>
              <a v-if="signedIn" @click="signedIn = !signedIn">Sign out</a>
              <router-link v-if="!signedIn" to="/signin">Sign In</router-link>
              <!-- <a v-else @click="signedIn = !signedIn">Sign in/up</a> -->
            </div>
            <theme-mgr/>
          </div>
        </div>
      </fixed-header>
        <transition-page class="content">
          <router-view/>
        </transition-page>
    </modal>
  </div>
</template>

<script>
import FixedHeader from 'vue-fixed-header'
import Textfield from '@/components/Textfield'
import ThemeMgr from './modules/ThemeMgr'
import Modal from './modules//Modal'
import TransitionPage from './modules/TransitionPage'
import SearchIcon from '@/assets/search.svg'

export default {
  name: 'App',
  components: {
    FixedHeader,
    ThemeMgr,
    Modal,
    TransitionPage,
    Textfield
  },
  data: function () {
    return {
      signedIn: false,
      prevHeight: 0,
      SearchIcon
    }
  },
  methods: {
    setModal: function (modal) {
      this.modal = modal
    },
    onSearchInput: function (e) {
      const searchValue = e.target.value
      this.searchQuery = searchValue
    }
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
}
.navbar {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 5px 0px;
  border-bottom: 1px solid gray;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 300;
}
.navbar h1 {
  font-size: 32px;
  margin: 0;
  padding: 0;
  display: flex;
  cursor: pointer;
}
.navbar .logo {
  margin-left: 5px;
}
.navbar .menu {
  padding: 10px;
  display: flex;
  flex-direction: row;
}

.content {
  margin-top: 70px;
}

.search-field {
  min-width: 30px;
  width: auto;
  transition: all .25s;
  padding-top: 0;
  height: 35px;
  --labelHeight: 32px;
  --textHeight: 24px;
  --labelTop: -12px;
  --labelBottom: -6px;
  margin-right: 10px;
}

.search-field input {
  width: 30px;
  max-width: 30px;
  transition: .2s all;
}
.search-field input:hover, input:focus{
  width: 180px;
  max-width: 180px;
  margin-right: 0;
}

.search-field input:not(:placeholder-shown){
  width: 180px;
  max-width: 180px;
  margin-right: 0;
}
</style>

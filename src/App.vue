<template>
  <div id="app" v-bind:class="{'disable-selection': disableSelection}">
    <modal @setModal="setModal">
      <fixed-header>
        <div class="navbar">
          <div class="logo" @click="$modal.show('Test', 'This is a test modal')">
            <h1><img src="./assets/favicon.png" width="54" height="54"/> Latte CPanel</h1>
          </div>
          <div class="menu">
            <div class="menu-items">
              <!-- <textfield class="search-field" id="searchbox" :icon="SearchIcon" type="text" :oninput="onSearchInput"/> -->
              <router-link v-if="signedIn" to="/">Dashboard</router-link>
              <router-link v-if="signedIn" to="/profile">Profile</router-link>
              <router-link to="/about">About</router-link>
              <a v-if="signedIn" @click="signOut">Sign out</a>
              <router-link v-if="!signedIn" to="/signin">Sign In</router-link>
              <!-- <a v-else @click="signedIn = !signedIn">Sign in/up</a> -->
            </div>
            <theme-mgr/>
          </div>
        </div>
      </fixed-header>
      <vue-drawer-layout
        ref="drawer"
        :drawer-width="500"
        :drawable-distance="420"
        :content-drawable="true"
        :enable="signedIn"
        :animatable="true"
        :z-index="100"
        :backdrop="true"
        :backdrop-opacity-range="[0,0.4]"
        @slide-start="handleSlideStart"
        @slide-move="handleSlideMove"
        @slide-end="handleSlideEnd"
        @mask-click="handleMaskClick"
        >
          <div class="drawer-content" slot="drawer" v-if="signedIn">
            <div id="nav-icon1" v-bind:class="{open: isDrawerOpen}" @click="toggleDrawer">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="userline">
              <avatar v-bind:class="{ 'avashort': !isDrawerOpen }" :username="username" :src="ava" :size="60" class="ava" />
              <span class="divi" v-bind:class="{ 'divi-short': !isDrawerOpen }"></span>
              <span class="username" v-bind:class="{ 'username-short': !isDrawerOpen }">{{username}}#<span class="discriminator">{{discriminator}}</span></span>
            </div>
            <divider></divider>

            <transition-group
              name="guilds-list"
              tag="div"
              v-bind:css="false"
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:leave="leave"
              class="d-guild-dropdown"
            >
              <div class="d-guild-preview" v-bind:key="currentGuildName" v-bind:class="{ 'd-guild-preview-short': !isDrawerOpen }" @click="toggleGuildList()">
                <img :src="currentGuildIcon" alt=""/>
                <span>{{currentGuildName}}</span>
              </div>
              <div
                v-for="guild in guilds"
                v-bind:key="guild.id"
                class="d-guild-preview"
                v-bind:class="{ 'd-guild-preview-short': !isDrawerOpen }"
                @click="selectGuild(guild)"
              >
                <img :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`" alt=""/>
                <span>{{guild.name}}</span>
              </div>
            </transition-group>
            <divider/>
            <transition-group
              name="staggered-fade"
              tag="div"
              v-bind:css="false"
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:leave="leave"
            >
            <div v-for="(item, index) in menuItems" v-bind:key="item.name" v-bind:data-index="index" @click="selectActive(item)">
              <div class="arrow-right" v-bind:class="{ 'arrow-right-short': !isDrawerOpen }" v-if="item === activeComponent"></div>
              <div class="d-menuitem" v-bind:class="{ 'd-menuitem-short': !isDrawerOpen }">
                <i class="icon" v-bind:class="item.icon"></i>
                <span class="title"  v-bind:class="{ 'username-short': !isDrawerOpen }">{{item.name}}</span>
              </div>
              <divider/>
            </div>
            </transition-group>
            <div class="drawer-footer">
              <a href="https://icons8.com/">Used icons8</a>
            </div>
          </div>
          <div slot="content">
            <transition-page class="content">
              <router-view/>
            </transition-page>
          </div>
      </vue-drawer-layout>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import FixedHeader from 'vue-fixed-header'
import Velocity from 'velocity-animate'
import Avatar from '@lossendae/vue-avatar'
// import Textfield from '@/components/Textfield'
import RenderString from '@/components/RenderString'
import Divider from '@/components/Divider'
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
    // Textfield,
    Divider,
    RenderString,
    Avatar
  },
  data () {
    return {
      prevHeight: 0,
      isDrawerOpen: false,
      guildListOpen: false,
      disableSelection: false,
      SearchIcon,
      activeComponent: null,
      drawerItems: {
        Dashboard: [
          {
            name: 'Dashboard',
            icon: 'las la-home'
          },
          {
            name: 'Roles',
            icon: 'las la-user-cog'
          },
          {
            name: 'Triggers',
            icon: 'las la-bolt'
          },
          {
            name: 'Music Player',
            icon: 'las la-music'
          }
        ],
        Profile: [
          {
            name: 'General',
            icon: 'las la-user-circle'
          },
          {
            name: 'Prefeences',
            icon: 'las la-cog'
          },
          {
            name: 'Templates',
            icon: 'las la-copy'
          }
        ]
      }
    }
  },
  computed: {
    signedIn () {
      return (this.$store.state.user && !!this.$store.state.user.id) || false
    },
    menuItems () {
      const items = this.drawerItems[this.$route.name || 'Dashboard']
      // console.log(items, this.$route.name)
      return items
    },
    itemClass () {
      if (this.isDrawerOpen) { return 'wide' } else { return 'short' }
    },
    user () {
      return this.$store.state.user
    },
    currentGuild () {
      return this.$store.state.currentGuild
    },
    username () {
      return `${this.user.username}`
    },
    discriminator () {
      return `${this.user.discriminator}`
    },
    ava () {
      return `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatar}.png`
    },
    currentGuildIcon () {
      return `https://cdn.discordapp.com/icons/${this.currentGuild.id}/${this.currentGuild.icon}.png`
    },
    currentGuildName () {
      return this.currentGuild.name || 'noname-guild'
    },
    guilds () {
      return this.guildListOpen ? this.$store.state.guilds : []
    }
  },
  methods: {
    setModal: function (modal) {
      Vue.prototype.$modal = modal
      // this.modal = modal
    },
    onSearchInput: function (e) {
      const searchValue = e.target.value
      this.searchQuery = searchValue
    },
    signOut () {
      this.$store.dispatch('deauth').then(() => this.$router.push('/signin'))
    },
    toggleDrawer () {
      this.isDrawerOpen = !this.isDrawerOpen
      this.$refs.drawer.toggle()
    },
    toggleGuildList () {
      // console.log('toggleList', this.guildListOpen, this.guilds)
      this.guildListOpen = !this.guildListOpen
    },
    selectGuild (guild) {
      // console.log(guild)
      this.$store.dispatch('setCurrentGuild', guild)
      this.guildListOpen = false
    },
    handleSlideStart () {
      this.disableSelection = true
    },
    handleSlideMove () {

    },
    handleSlideEnd (visible) {
      this.disableSelection = visible
      this.isDrawerOpen = visible
    },
    handleMaskClick () {
      this.toggleDrawer()
    },
    selectActive (item) {
      this.activeComponent = item
      this.$store.commit('setPage', item.name)
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '75px' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  },
  mounted () {
    this.$socket.client.on('getuser', (redirectPayload) => {
      console.log('redirect', redirectPayload)
      if (this.user && this.user.id != null) {
        this.$socket.client.emit('action', {
          method: 'signin',
          setuser: this.user
        }, () => {
          if (!redirectPayload) return
          this.$socket.client.emit('action', {
            ...redirectPayload
          })
        })
      } else {
        console.log('not authorized')
      }
    })
    if (this.user && this.user.id != null) {
      this.$socket.client.emit('action', {
        method: 'signin',
        setuser: this.user
      })
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

.arrow-right {
  width: 0;
  height: 0;
  position: absolute;
  margin-top: 20px;
  border-top: 16px solid transparent;
  border-bottom: 16px solid transparent;

  border-left: 16px solid rgb(129, 129, 129);
}

.arrow-right-short {
  width: 0;
  height: 0;
  position: absolute;
  right: 72px;
  margin-top: 20px;
  border-top: 16px solid transparent;
  border-bottom: 16px solid transparent;

  border-left: 16px solid rgb(201, 201, 201);
}

.d-menuitem {
  text-align: left;
  padding: 10px;
  cursor: pointer;
  transition: all ease-in-out .25s;
  display: inline-flex;
  align-items: center;
  justify-items: start;
  width: 94%;
  max-height: 54px;
  overflow: hidden;
}

.userline {
  text-align: left;
  padding: 10px;
  padding-left: 25px;
  cursor: pointer;
  transition: all ease-in-out .2s;
  display: inline-flex;
  align-items: center;
  justify-items: start;
  width: 94%;
  overflow: hidden;
}

.userline .ava {
  transition: all ease-in-out .2s;
  /* margin-right: 30px; */
}

.userline .username {
  font-size: 32px;
  transition: all ease-in-out .2s;
}

.userline .divi {
  width: 30px;
  transition: all ease-in-out .2s;
}

.userline .divi-short {
  width: 0px;
}

.username-short {
  transition: all ease-in-out .2s;
  opacity: 0;
  width: 0px;
  padding: 0px;
  margin: 0px;
  height: 54px;
}

.userline .discriminator {
  transition: all ease-in-out .2s;
  font-size: 32px;
  color: gray;
}

.avashort {
  /* flex-direction: row-reverse;
  padding: 8px;
  margin-right: -12px; */
  margin-left: 400px;
  padding: 0;
  transition: all ease-in-out .2s;
}

.d-menuitem-short {
  margin-left: 400px;
  width: 70px;
  transition: all ease-in-out .2s;
}

.d-guild-dropdown {
  /* height: 75px; */
  transition: all ease-in-out .2s;
  overflow: hidden;
}

.d-guild-preview {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 36px;
  cursor: pointer;
  transition: all ease-in-out .2s;
}

.d-guild-preview span {
  transition: all ease-in-out .2s;
}

.d-guild-preview:hover {
  background-color: rgba(117, 117, 117, 0.2);
}

.d-guild-preview img {
  width: 54px;
  height: 54px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 30px;
}

.d-guild-preview-short {
  margin-left: 400px;
  transition: all ease-in-out .2s;
}

.d-guild-preview-short img {
  /* width: 70px; */
  margin-right: 15px;
  /* margin-left: 15px; */
}

.d-guild-preview-short span {
  opacity: 0;
  width: 0px;
  padding: 0px;
  margin: 0px;
  height: 54px;
}

.d-guild-preview-list {
  transform: scaleY(0);
}

.d-menubutton {
  text-align: right;
  padding: 10px;
  /* padding-right: 4px;   */
  margin-right: 6px;
  cursor: pointer;
  transition: all ease-in-out .25s;
  display: inline-flex;
  align-items: center;
  justify-content: end;
  width: 96%;
}

.d-menuitem:hover {
  background-color: rgba(117, 117, 117, 0.2);
}

.d-menuitem:active {
  background-color: rgba(199, 199, 199, 0.308);
}

.d-menuitem .icon {
  font-size: 54px;
  margin-right: 15px;
  margin-left: 15px;
}

.avashort .icon {
  margin-left: 20px;
}

.d-menubutton .icon {
  font-size: 54px;
}
.d-menubutton:hover {
  background-color: rgba(117, 117, 117, 0.2);
}

.d-menubutton:active {
  background-color: rgba(199, 199, 199, 0.308);
}

.d-menuitem .title {
  font-size: 32px;
  margin-left: 15px;
  transition: all ease-in-out .2s;
}

.drawer-footer {
  position: absolute;
  bottom: 0px;
  left: 2%;
  height: 80px;
  border-top: 1px solid grey;
  width: 96%;
  padding-top: 5px;
}

.disable-selection {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
   -khtml-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
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
  position: sticky;
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
.search-field input:hover, .search-field input:focus{
  width: 180px;
  max-width: 180px;
  margin-right: 0;
}

.search-field input:not(:placeholder-shown){
  width: 180px;
  max-width: 180px;
  margin-right: 0;
}

#nav-icon1 {
  width: 60px;
  height: 45px;
  /* transform: scale(0.7); */
  position: relative;
  margin: 10px auto;
  margin-top: 10px;
  margin-right: 12px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg) scale(0.8);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

#nav-icon1 span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #ffffff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
  top: 0px;
}

#nav-icon1 span:nth-child(2) {
  top: 18px;
}

#nav-icon1 span:nth-child(3) {
  top: 36px;
}

#nav-icon1.open span:nth-child(1) {
  top: 18px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

#nav-icon1.open span:nth-child(3) {
  top: 18px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
</style>

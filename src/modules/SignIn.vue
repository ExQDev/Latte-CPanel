<template>
  <div class="card centered container signin-form">
    <div class="signin-header">
      <!-- <discord-logo class="draggable-area" style="margin-top: -5px;" /> -->
      <img class="draggable-area" style="margin-top: -5px;" src="../assets/discord-logo.png"/>
      <!-- <h1 class="draggable-area" style="margin-top: -5px;">Sign In</h1> -->
      <div id="theme-mgr">
        <theme-manager :root="root"></theme-manager>
      </div>
    </div>
    <div id="signin-app" class="signin-content">
      <!-- <editor></editor> -->
      <v-button style="margin-top: 20%;" :onclick="signin">{{labelSubmit}}</v-button>
    </div>
  </div>
</template>

<script>
import ThemeManager from '../components/ThemeSwitcher'
import Textfield from '../components/Textfield'
import VButton from '../components/Button'
import Editor from './TriggerEditor'

export default {
  data () {
    return {
      labelSubmit: 'Sign In with Discord',
      root: this
    }
  },
  methods: {
    signin () {
      console.log(this.$socket)
      this.$socket.client.emit('action', { method: 'getoauthurl' }, (url) => {
        console.log(url)
        window.open(url)
      })
    }
  },
  components: {
    ThemeManager,
    Textfield,
    VButton,
    Editor
  }
}
</script>

<style scoped>
.centered {
  margin: auto;
  margin-top: 25vh;
}

.card {
  height: auto;
  padding-bottom: 40px;
}
</style>

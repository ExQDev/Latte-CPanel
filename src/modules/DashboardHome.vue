<template>
  <div>
    <div class="card wide">
      <div class="card-header">
        <h2>General</h2>
      </div>
      <div class="card-content">
        <Textfield label="Prefix" :oninput="prefixEdit" :value="prefix" type="text"></Textfield>
      </div>
      <div class="card-footer">
        <v-button :onclick="applyGeneral">Apply</v-button>
        <v-button :onclick="invite">Invite</v-button>
      </div>
    </div>
    <div class="card wide">
      <div class="card-header">
        <h2>Greetings</h2>
      </div>
      <div class="card-content">
        <div class="form-item">
          <checkbox :value="guild.greet" @input="greetCheck">Greet when user spawn?</checkbox>
          <div v-if="guild.greet">
            <dropdown
              :oninput="searchChannelGreet"
              :onselect="onSelectChannelGreet"
              label="Channel"
              :options="availableChannels"
              :value="guild.greetChannel.name">
            </dropdown>
          </div>
        </div>
        <div class="form-item">
          <checkbox :value="guild.bye" @input="byeCheck">Bye when user leaves guild?</checkbox>
          <div v-if="guild.bye">
            <dropdown
              :oninput="searchChannelBye"
              :onselect="onSelectChannelBye"
              label="Channel"
              :options="availableChannels"
              :value="guild.byeChannel.name">
            </dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'Dashboard',
  data () {
    return {
      prefix: '>',
      guild: {
        greet: false,
        bye: false,
        greetChannel: {
          id: null,
          name: null
        },
        byeChannel: {
          id: null,
          name: null
        }
      },
      channels: [],
      availableChannels: []
    }
  },
  methods: {
    prefixEdit (e) {
      this.prefix = e.target.value
    },
    greetCheck (checked) {
      this.guild.greet = checked
      if (checked) {
        this.$socket.client.emit('action', {
          method: 'getChannels',
          guild: this.$store.state.currentGuild.id
        })
      }
    },
    byeCheck (checked) {
      this.guild.bye = checked
      if (checked) {
        this.$socket.client.emit('action', {
          method: 'getChannels',
          guild: this.$store.state.currentGuild.id
        })
      }
    },
    onSelectChannelGreet (chan) {
      this.guild.greetChannel = cloneDeep(chan)
    },
    onSelectChannelBye (chan) {
      this.guild.byeChannel = cloneDeep(chan)
    },
    searchChannelGreet (chan) {
      this.availableChannels = this.channels.filter(a => a.name.includes(chan.target.value))
      // console.log(rol.target.value, this.availableRoles)
      this.guild.greetChannel.name = chan.target.value
    },
    searchChannelBye (chan) {
      this.availableChannels = this.channels.filter(a => a.name.includes(chan.target.value))
      // console.log(rol.target.value, this.availableRoles)
      this.guild.byeChannel.name = chan.target.value
    },
    applyGeneral () {
      this.$socket.client.emit('action', {
        method: 'setPrefix',
        guild: this.$store.state.currentGuild.id,
        prefix: this.prefix
      })
    },
    invite () {
      this.$socket.client.emit('action', {
        method: 'generateInvite',
        guild: this.$store.state.currentGuild.id
      })
    }
  },
  mounted () {
    this.$socket.client.on('prefix', (prefix) => {
      this.prefix = prefix
    })
    this.$socket.client.on('invite', (link) => {
      window.open(link)
    })
    this.$socket.client.on('channels', (channels) => {
      this.channels = channels
      this.availableChannels = channels
      console.log(channels)
    })
    this.$socket.client.emit('action', {
      method: 'getPrefix',
      guild: this.$store.state.currentGuild.id
    })
  }
}
</script>

<style>
.form-item {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>

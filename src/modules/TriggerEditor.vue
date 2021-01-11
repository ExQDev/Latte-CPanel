<template>
  <div>
    <div class="head-card">
      <div>
        <dropdown
          :oninput="searchTrigger"
          :onselect="onSelectTrigger"
          label="Trigger"
          :options="availableTriggers"
          :value="callback.trigger">
        </dropdown>
        <tooltip v-if="messageIdAvailable" note="You can copy that from official Discord client">
          <textfield :oninput="messageIdInput" label="Message ID" type="text" :value="callback.messageId"></textfield>
        </tooltip>
        <tooltip
          v-if="containsEmoji"
          note="Copy/Paste or select your own"
          v-click-outside="onEmojiDefocus">
          <textfield
            :oninput="emojiInput"
            label="Emoji"
            type="text"
            v-on:click.native="onEmojiFocus"
            :value="callback.action.emoji">
          </textfield>
          <VEmojiPicker @select="selectEmoji" v-show="showEmojiSelect" :dark="isDark" class="emojipicker"/>
        </tooltip>
        <dropdown
          v-if="channelAvailable"
          :oninput="searchChannel"
          :onselect="onSelectChannel"
          label="Channel"
          :options="availableChannels"
          :value="callback.channel.name">
        </dropdown>
        <dropdown
          v-if="callback.trigger.length > 0"
          :oninput="searchAction"
          :onselect="onSelectAction"
          label="Action type"
          :options="availableActions"
          :value="callback.action.type">
        </dropdown>
        <dropdown
          v-if="hasRole"
          :oninput="searchRole"
          :onselect="onSelectRole"
          label="Role"
          :options="availableRoles"
          :value="callback.action.role.name">
        </dropdown>
        <v-button :onclick="saveTrigger" class="fullwidth">Save</v-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/Tooltip'
import SearchIcon from '@/assets/search.svg'
import { cloneDeep } from 'lodash'

export default {
  components: {
    Tooltip
    // Textfield
  },
  props: [ 'saved' ],
  data () {
    return {
      SearchIcon,
      callback: {
        id: '',
        action: {
          id: '',
          type: '',
          target: '',
          condition: '',
          role: {
            id: '',
            name: '',
            color: ''
          },
          emoji: ''
        },
        trigger: '',
        guild: this.$store.state.currentGuild.id,
        messageId: '',
        channel: {
          id: '',
          name: ''
        }
      },
      triggers: [
        'OnReact',
        'OnUnreact',
        'OnMessage',
        'OnJoin',
        'OnLeave',
        'OnJoinChannel',
        'OnLeaveChannel',
        'OnGetBanned',
        'OnGetKicked'
      ],
      actions: [
        'AddRole',
        'RemoveRole',
        'Ban',
        'Kick',
        'Warn',
        'Rename',
        'React',
        'Message',
        'Edit'
      ],
      roles: [],
      guilds: [],
      channels: [],
      availableChannels: [],
      availableTriggers: [],
      availableActions: [],
      availableRoles: [],
      showEmojiSelect: false
    }
  },
  computed: {
    messageIdAvailable () {
      return ['OnReact', 'OnUnreact'].includes(this.callback.trigger)
    },
    containsEmoji () {
      return ['OnReact', 'OnUnreact', 'OnMessage'].includes(this.callback.trigger)
    },
    channelAvailable () {
      return [ 'OnMessage', 'OnJoin', 'OnLeave', 'OnJoinChannel', 'OnLeaveChannel' ].includes(this.callback.trigger)
    },
    isDark () {
      return localStorage.getItem('theme') === 'dark'
    },
    hasRole () {
      return [ 'AddRole', 'RemoveRole' ].includes(this.callback.action.type)
    }
  },
  methods: {
    to (link) {
      return () => {
        window.open(link)
      }
    },
    onSelectTrigger (trigger) {
      console.log(trigger)
      this.callback.trigger = trigger
    },
    onSelectAction (action) {
      console.log(action)
      this.callback.action.type = action
    },
    onSelectRole (role) {
      console.log(role)
      this.callback.action.role = cloneDeep(role)
    },
    onSelectChannel (chan) {
      console.log(chan)
      this.callback.channel = cloneDeep(chan)
    },
    searchTrigger (trig) {
      this.availableTriggers = this.triggers.filter(t => t.includes(trig.target.value)) // .map(trig => ({ title: trig,  }))
      this.callback.trigger = trig.target.value
    },
    searchAction (act) {
      this.availableActions = this.actions.filter(a => a.includes(act.target.value))
      this.callback.action.type = act.target.value
    },
    searchRole (rol) {
      this.availableRoles = this.roles.filter(a => a.name.includes(rol.target.value))
      // console.log(rol.target.value, this.availableRoles)
      this.callback.action.role.name = rol.target.value
    },
    searchChannel (chan) {
      this.availableChannels = this.channels.filter(a => a.name.includes(chan.target.value))
      // console.log(rol.target.value, this.availableRoles)
      this.callback.channel.name = chan.target.value
    },
    messageIdInput (e) {
      this.callback.messageId = e.target.value
    },
    emojiInput (e) {
      this.callback.action.emoji = e.target.value
      console.log(this.callback.action.emoji)
    },
    selectEmoji (emoji) {
      console.log(this.callback.action.emoji, emoji.data)
      this.callback.action.emoji += emoji.data
    },
    onEmojiFocus (e) {
      // console.log('focus', e)
      this.showEmojiSelect = true
    },
    onEmojiDefocus (e) {
      // console.log(e)
      this.showEmojiSelect = false
    },
    saveTrigger () {
      console.log('save', this.callback)
      if (!this.callback.trigger) {
        this.$modal.show('Error', 'Please, select Trigger type')
        return
      }
      if (this.messageIdAvailable && !this.callback.messageId) {
        this.$modal.show('Error', 'Please, enter message ID, you can copy & paste it from official Discord client')
        return
      }
      if (this.channelAvailable && !this.callback.channel) {
        this.$modal.show('Error', 'Channel must be specified for this trigger type')
        return
      }
      if (!this.callback.action || !this.callback.action.type) {
        this.$modal.show('Error', 'Please, specify action type')
        return
      }
      if (this.containsEmoji && !this.callback.action.emoji) {
        this.$modal.show('Error', 'Specify one or more emojis to take effect on this trigger')
        return
      }
      if (this.hasRole && !this.callback.action.role) {
        this.$modal.show('Error', 'No role has been specified to apply')
        // eslint-disable-next-line no-useless-return
        return
      }
      this.$socket.client.emit('action', {
        method: 'saveTrigger',
        callback: this.callback
      })
    }
  },
  events: {

  },
  created () {
    this.$socket.$subscribe('roles', (roles) => {
      this.roles = roles
      this.availableRoles = roles // [...roles.map(r => r.name)]
      console.log(roles)
    })
    this.$socket.$subscribe('channels', (channels) => {
      this.channels = channels
      this.availableChannels = channels // [...channels.map(c => c.name)]
      // console.log(channels)
    })
    this.$socket.$subscribe('callback', (cb) => {
      // this.roles = roles
      // this.availableRoles = roles // [...roles.map(r => r.name)]
      console.log(cb)
    })
    this.$unsubscribe = this.$socket.$unsubscribe
  },
  activated () {
    this.$socket.client.emit('action', {
      method: 'getRoles',
      guild: this.$store.state.currentGuild.id
    })
    this.$socket.client.emit('action', {
      method: 'getChannels',
      guild: this.$store.state.currentGuild.id
    })
  },
  mounted () {
    this.availableTriggers = [...this.triggers]
    this.availableActions = [...this.actions]
    this.availableRoles = []
    this.availableChannels = []
    if (this.saved) {
      this.callback = { ...this.saved }
    }
  },
  deactivated () {
    this.$unsubscribe('roles')
    this.$unsubscribe('channels')
    this.$unsubscribe('callback')
  }
}
</script>

<style>
  .head-card {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 20px;
    text-align: left;
  }
  .head-card-row {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
  }
  .emojipicker {
    position: absolute;
    z-index: 10;
    left: 45px;
    margin-top: 64px;
  }
  .fullwidth {
    width: 100%;
  }
</style>

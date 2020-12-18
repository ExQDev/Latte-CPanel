<template>
  <div>
    <div class="head-card">
      <h1>Edit callback</h1>
      <div>
        <dropdown :oninput="searchTrigger" :onselect="onSelectTrigger" label="Trigger" :options="availableTriggers" :value="callback.trigger"></dropdown>
        <dropdown :oninput="searchAction" :onselect="onSelectAction" label="Action type" :options="availableActions" :value="callback.action.type" ></dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from '@/components/Button'
import Dropdown from '@/components/Dropdown'

export default {
  components: {
    VButton,
    Dropdown
  },
  data () {
    return {
      callback: {
        id: '',
        action: {
          id: '',
          type: '',
          target: '',
          condition: '',
          role: '',
          emoji: ''
        },
        trigger: '',
        guild: '',
        messageId: ''
      },
      triggers: [
        'OnReact',
        'OnUnreact',
        'OnMessage',
        'OnJoin',
        'OnLeave',
        'OnjoinChannel',
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
        'Rename'
      ],
      roles: [],
      guilds: [],
      availableTriggers: [],
      availableActions: []
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
    searchTrigger (trig) {
      this.availableTriggers = this.triggers.filter(t => t.includes(trig.target.value)) // .map(trig => ({ title: trig,  }))
      this.callback.trigger = trig.target.value
    },
    searchAction (act) {
      this.availableActions = this.actions.filter(a => a.includes(act.target.value))
      this.callback.action.type = act.target.value
    }
  },
  mounted () {
    this.availableTriggers = [...this.triggers]
    this.availableActions = [...this.actions]
  }
}
</script>

<style>
  .head-card {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 20px;
  }
  .head-card-row {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
  }
  .gem-preview {
    max-width: 50%;
  }
  .gem-info {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: start;
    text-align: left;
    padding: 10px;
  }
  .gem-fast-links {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
  .gem-fast-link {
    margin-right: 10px;
  }
</style>

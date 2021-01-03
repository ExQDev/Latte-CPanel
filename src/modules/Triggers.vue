<template>
  <div class="content-container">
    <!-- <div v-for="trigger in triggers">

    </div> -->
    <div class="toolbox">
      <v-button :onclick="toggleEditor" :noshift="true"><i class="las la-plus"></i>New trigger</v-button>
      <v-button :onclick="deleteAll" :noshift="true"><i class="las la-trash-alt"></i>Purge all</v-button>
    </div>
    <SortedTable :values="callbacks" class="triggers-table">
      <thead>
        <tr>
          <th scope="col" style=" width: 15rem;">
            <SortLink name="trigger">Trigger</SortLink>
          </th>
          <th scope="col" style=" width: 15rem;">
            <SortLink name="channel">Channel</SortLink>
          </th>
          <th scope="col" style=" width: 15rem;">
            <SortLink name="messageId">Message ID</SortLink>
          </th>
          <th scope="col" style=" width: 15rem;">
            <SortLink name="action.type">Action</SortLink>
          </th>
          <th scope="col" style=" width: 15rem;">
            <SortLink name="action.emoji">Emoji</SortLink>
          </th>
          <th scope="col" style=" width: 15rem;">
            <SortLink name="action.role">Role</SortLink>
          </th>
          <th scope="col" style=" width: 10rem;">
            Manage
          </th>
        </tr>
      </thead>
      <!-- <tbody slot="body" slot-scope="sort" class="divider div-transparent"> -->
         <transition-group
              name="s2-staggered-fade"
              tag="tbody"
              v-bind:css="false"
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:leave="leave"
              slot="body"
              slot-scope="sort"
              class="divider div-transparent"
          >
          <tr v-for="value in callbacks" :key="value._id">
            <td>{{ value.trigger }}</td>
            <td>{{ value.channel }}</td>
            <td>{{ value.messageId }}</td>
            <td>{{ value.action.type }}</td>
            <td>{{ value.action.emoji }}</td>
            <td>{{ value.action.role }}</td>
            <td>
              <div class="manage-acts">
                <v-button :onclick="editTrigger(value)" :noshift="true"><i class="las la-pen"></i></v-button>
                <v-button :onclick="deleteTrigger(value)" :noshift="true"><i class="las la-trash-alt"></i></v-button>
              </div>
            </td>
          </tr>
         </transition-group>
      <!-- </tbody> -->
    </SortedTable>
    <modal
      v-model="editorOpen"
      title="Trigger Editor"
      modalClass="card modal"
    >
      <trigger-editor :saved="currentTrigger"></trigger-editor>
    </modal>
  </div>
</template>

<script>
import VButton from '@/components/Button'
import TriggerEditor from './TriggerEditor'
import Divider from '@/components/Divider'
import Velocity from 'velocity-animate'

export default {
  name: 'Triggers',
  components: {
    VButton,
    TriggerEditor,
    Divider
  },
  data () {
    return {
      editorOpen: false,
      currentTrigger: null
    }
  },
  computed: {
    callbacks () {
      return this.$store.state.callbacks
    }
  },
  methods: {
    toggleEditor () {
      this.editorOpen = !this.editorOpen
    },
    editTrigger (t) {
      return () => {
        console.log(t)
        this.currentTrigger = t
        this.editorOpen = true
      }
    },
    deleteTrigger (t) {
      return () => {
        console.log(t)
        this.$socket.client.emit('action', {
          method: 'deleteTrigger',
          callback: t
        })
      }
    },
    deleteAll () {
      this.$socket.client.emit('action', {
        method: 'deleteTrigger',
        callback: {
          guild: this.$store.state.currentGuild.id
        }
      })
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
          { opacity: 1 },
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
  watch: {
    editorOpen (newVal) {
      if (!newVal) { this.currentTrigger = null }
    }
  },
  mounted () {
    this.$socket.client.on('triggers', (triggers) => {
      console.log(triggers)
      this.currentTrigger = null
      this.$store.commit('setCallbacks', triggers)
    })
    this.$socket.client.on('trigger', (trigger) => {
      console.log(trigger)
      this.currentTrigger = null
      this.$store.commit('pushBackCallback', trigger)
    })
    this.$socket.client.on('callback', (cb) => {
      this.editorOpen = false
      console.log(cb)
      this.currentTrigger = null
      this.$socket.client.emit('action', {
        method: 'getTriggers',
        guild: this.$store.state.currentGuild.id
      })
    })
    this.$socket.client.on('deleted-callback', (cb) => {
      this.editorOpen = false
      console.log(cb)
      this.currentTrigger = null
      this.$socket.client.emit('action', {
        method: 'getTriggers',
        guild: this.$store.state.currentGuild.id
      })
    })
    this.$socket.client.emit('action', {
      method: 'getTriggers',
      guild: this.$store.state.currentGuild.id
    })
  }
}
</script>

<style>
.content-container {
  padding: 30px;
}

.modal {
  margin-top: 70px;
}

.triggers-table-body-pad {
  top: 10px;
}

.triggers-table {
  margin: auto;
  font-size: 22px;
  margin-top: 30px;
}

.triggers-table th {
  height: 48px;
  vertical-align: middle;

}

.triggers-table table {
  border-collapse: collapse;
}

.triggers-table tr {
  transition: .2s all linear;
}

.triggers-table td {
  padding: 0;
  margin: 0;
}

.triggers-table tr:hover{
  /* border-top: 1px solid white; */
  background-color: rgba(255,255,255,0.4);
  border-color: rgba(255,255,255,0.4);
}

.manage-acts {
  display: inline-flex;
}

.toolbox {
  height: 45px;
  display: flex;
  margin: auto;
  justify-content: center;
}

.toolbox button {
  margin: 2px;
}
</style>>

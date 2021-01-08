<template>
    <div id="modal-app">
      <slot></slot>
      <v-dialog v-if="modalShown" :reject="close" :accept="action ? doAction : null" oktitle="OK" :title="title" :body="body"></v-dialog>
    </div>
</template>

<script>

import VDialog from './../components/Dialog'

export default {
  props: [ 'setModal' ],
  data () {
    return {
      modalShown: false,
      title: '',
      body: '',
      action: null
    }
  },
  methods: {
    show (title, body, action) {
      this.title = title
      this.body = body
      this.action = action
      this.modalShown = true
    },
    close () {
      this.modalShown = false
      if (this.reject) { this.reject() }
    },
    doAction () {
      if (this.action) {
        this.action()
      }
      this.modalShown = false
    }
  },
  beforeMount () {
    this.$emit('setModal', {
      show: this.show,
      close: this.close
    })
  },
  components: {
    VDialog
  }
}
</script>

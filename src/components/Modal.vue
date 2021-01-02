<template>
  <Modal v-model="isOpen" :title="title">
    <slot></slot>
  </Modal>
</template>

<script>
import VueModal from '@kouts/vue-modal'

export default {
  name: 'Modal',
  props: [ 'title', 'isOpen' ],
  data: function () {
    return {
    }
  },
  components: {
    Modal: VueModal
  }
}
</script>

<style>

</style>

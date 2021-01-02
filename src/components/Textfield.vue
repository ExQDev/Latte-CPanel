<template>
  <div class="md-textfield">
    <span class="md-textfield-icon" v-if="icon" v-html="icon"></span>
    <input
      class="md-textfield-input"
      :type="type"
      :id="id"
      :name="id"
      placeholder=" "
      v-on:input="oninput"
      autocomplete="off"
      :value="value">
    <label :for="id">{{label}}</label>
    <div class="indicator"></div>
  </div>
</template>

<script>
export default {
  methods: {
    noop () {}
  },
  props: ['id', 'label', 'icon', 'type', 'oninput', 'value', 'focus', 'defocus']
}
</script>

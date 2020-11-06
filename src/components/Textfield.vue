<template>
  <div class="md-textfield">
    <span class="md-textfield-icon" v-html="icon"></span>
    <input class="md-textfield-input" :type="type" :id="id" :name="id" placeholder=" " v-on:input="oninput" autocomplete="off">
    <label :for="id">{{label}}</label>
    <div class="indicator"></div>
  </div>
</template>

<script>
export default {
  props: ['id', 'label', 'icon', 'type', 'oninput']
}
</script>

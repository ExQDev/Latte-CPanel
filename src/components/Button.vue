<template>
  <button v-on:click="onclick" :disabled="disabled">
    <a>
      <slot></slot>
      <span v-if="!disabled && !noshift" class="shift">›</span>
    </a>
    <div class="mask"></div>
  </button>
</template>

<script>
export default {
  props: ['label', 'onclick', 'disabled', 'noshift']
}
</script>

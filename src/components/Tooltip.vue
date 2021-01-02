<template>
  <div class="tooltipable">
    <slot></slot>
    <div class="tooltip">
      <span>{{note}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['note']
}
</script>

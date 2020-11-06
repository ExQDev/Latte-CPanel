<template>
  <div class="checkbox">
    <input :name="id" :id="id" type="checkbox" :checked="value"
            @change="$emit('input', $event.target.checked)"
            class="check">
    <label :for="id" style="25px;">
      <svg viewBox="0,0,50,50">
        <path d="M5 30 L 20 45 L 45 5"></path>
      </svg>
    </label>
    <label>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: ['value', 'id']
}
</script>

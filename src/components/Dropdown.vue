<template>
  <div class="md-select">
    <input id="ind" type="text" placeholder=" " :value="value" v-on:input="oninput" :disabled="disabled">
    <label for="ind">{{label}}</label>
    <div class="indicator"></div>
    <ul>
      <li
        v-for="(option, index) in options"
        v-bind:key="`ko-${index||option.id}`"
        class="option"
        v-bind:style="{ 'background-color': option.color ? `#${Number(option.color).toString(16)}` : false }"
        v-on:click="() => onselect(option||'')">
        <a>{{option.name||option.title||option||''}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [ 'onselect', 'label', 'options', 'value', 'oninput', 'disabled' ],
  mounted () {
    console.log(this.options)
  }
}
</script>

<template>
  <div id="tabs" class="tab-container">
    <div class="tabs">
        <a v-for="(tab, index) in tabs" v-bind:key="`ttk-${index}`" v-on:click="activetab=index" v-bind:class="[ activetab === index ? 'active' : '' ]">{{ tab.title }}</a>
    </div>

    <div class="tab-content">
      <div v-for="(tab, index) in tabs" v-bind:key="`ttc-${index}`" v-if="activetab === index" class="tabcontent">
        <component v-if="tab.component" :is="tab.component"></component>
        <render-string v-if="tab.content" :string="tab.content"></render-string>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tabs'],
  data () {
    return {
      activetab: 0
    }
  }
}
</script>

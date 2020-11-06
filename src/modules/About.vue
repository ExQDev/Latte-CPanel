<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <h3>What is it?</h3>
      <p>This store was created specially for Lumberyard community to develop, store and share gems and other resources for game development on the Lumberyard engine.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Lumberyard Gems Store'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

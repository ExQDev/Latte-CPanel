<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

.store-container {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.gems-list {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px;
  align-self: center;
}

.gem-item {
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 3px;
  transition: all .25s linear;
}

.gem-item:not(:last-child) {
  border-bottom: 1px solid gray;
}

.gem-item-thumb {
  width: 300px;
  height: 100%;

}

.gem-item-title {
  margin-left: 15px;
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
}

.gem-item-desc {
  margin: 15px;
  font-size: 18px;
  white-space: pre-line;
}

.gem-item-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

</style>

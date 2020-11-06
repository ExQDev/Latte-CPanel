<script>
export default {
  props: {
    string: {
      required: true,
      type: String
    }
  },
  render (h) {
    const render = {
      template: '<div>' + this.string + '</div>',
      methods: {
        markComplete () {}
      }
    }
    return h(render)
  }
}
</script>

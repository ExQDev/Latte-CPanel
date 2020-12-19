<template>
  <div>
    <h1>Authenticating...</h1>
    <spinner></spinner>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  name: 'Authenticating...',
  components: {
    Spinner
  },
  mounted () {
    this.$socket.client.on('user', (payload) => {
      this.$store.dispatch('auth', payload).then(() => {
        this.$router.push('/')
      })
    })

    const fragment = new URLSearchParams(window.location.hash.slice(1))

    if (fragment.has('access_token')) {
      const accessToken = fragment.get('access_token')
      const tokenType = fragment.get('token_type')

      this.$socket.client.emit('action', {
        method: 'auth',
        accessToken,
        tokenType
      })
    }
  }
}
</script>

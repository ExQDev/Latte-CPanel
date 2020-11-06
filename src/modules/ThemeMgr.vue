<template>
  <theme-switcher  @on-click="toggle" :theme="theme"></theme-switcher>
</template>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher'
import ThemeHelper from '../utils/ThemeHelper'

const themes = {
  light: '/static/light-shift.css',
  dark: '/static/dark-shift.css'
}

export default {
  props: [ 'root' ],
  data () {
    const themeHelper = new ThemeHelper(this.root)
    return {
      themeHelper,
      theme: this.theme
    }
  },
  methods: {
    setTheme (theme) {
      this.themeHelper.theme = theme
      this.theme = theme
    },
    load: async function () {
      this.themeHelper = new ThemeHelper(this.root)

      for (let n of Object.keys(themes)) {
        await this.themeHelper.add(n, themes[n])
      }

      let defaultTheme = 'light'

      if (localStorage.getItem('theme')) { defaultTheme = localStorage.getItem('theme') }

      this.setTheme(defaultTheme)
    },
    toggle: function () {
      let newTheme = this.themeHelper.theme === 'dark' ? 'light' : 'dark'
      this.setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
    }
  },
  beforeMount () {
    this.load()
  },
  components: {
    ThemeSwitcher
  }
}
</script>

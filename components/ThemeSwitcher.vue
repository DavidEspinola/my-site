<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn icon v-on="on" @click="changeTheme">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ $t('title') }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ThemeSwitcher extends Vue {
  darkTheme: boolean = process.browser
    ? !!localStorage.getItem('darkTheme') || false
    : false

  get icon() {
    return this.darkTheme
      ? 'mdi-moon-waning-crescent'
      : 'mdi-white-balance-sunny'
  }

  changeTheme() {
    this.darkTheme = !this.darkTheme
    this.$vuetify.theme.dark = this.darkTheme

    if (!process.browser) return
    if (this.darkTheme) {
      window.localStorage.setItem('darkTheme', 'active')
    } else {
      window.localStorage.removeItem('darkTheme')
    }
  }
}
</script>

<i18n lang="yaml">
en:
  title: 'Change theme'
es:
  title: 'Cambiar tema'
</i18n>

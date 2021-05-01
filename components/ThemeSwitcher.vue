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
import { LocalStorage } from '~/utils/LocalStorage'

@Component
export default class ThemeSwitcher extends Vue {
  darkTheme: boolean = !!LocalStorage.getItem('darkTheme')

  get icon() {
    return this.darkTheme
      ? 'mdi-moon-waning-crescent'
      : 'mdi-white-balance-sunny'
  }

  changeTheme() {
    this.darkTheme = !this.darkTheme
    this.$vuetify.theme.dark = this.darkTheme

    if (this.darkTheme) {
      LocalStorage.setItem('darkTheme', 'active')
    } else {
      LocalStorage.removeItem('darkTheme')
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

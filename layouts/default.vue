<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container class="main-container">
        <nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app class="hidden-print-only">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { LocalStorage } from '~/utils/LocalStorage'

@Component
export default class App extends Vue {
  created() {
    const darkTheme = !!LocalStorage.getItem('darkTheme')
    this.$vuetify.theme.dark = darkTheme
  }
}
</script>

<style scoped>
@media screen {
  .main-container {
    max-width: 620px;
  }
}
</style>

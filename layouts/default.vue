<template>
  <v-app>
    <app-bar />
    <v-main class="main">
      <v-container>
        <h1 class="text-h2 mb-4 hidden-screen-only">David Espínola Pérez</h1>
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
<style lang="scss" scoped>
@media print {
  .main {
    padding-top: 0 !important;
  }
}
</style>

<style lang="scss">
@media print {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .text-h1,
  .text-h2,
  .text-h3,
  .text-h4,
  .text-h5,
  .text-h6 {
    break-after: avoid;
  }
}
</style>

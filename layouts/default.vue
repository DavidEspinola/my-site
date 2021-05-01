<template>
  <v-app>
    <v-app-bar fixed app flat color="transparent">
      <v-toolbar-title v-text="'David Espínola Pérez'" />
      <v-spacer />
      <v-toolbar-items class="hidden-print-only">
        <theme-switcher />
        <v-btn text to="/" nuxt>About</v-btn>
        <v-btn text to="/inspire" nuxt>Contact</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app class="hidden-print-only">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$vuetify.theme.dark = false
  },
}
</script>

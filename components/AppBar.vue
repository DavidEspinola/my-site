<template>
  <v-app-bar fixed app flat dense :color="color" class="hidden-print-only">
    <v-toolbar-title v-text="'David Espínola Pérez'" />
    <v-spacer />
    <v-toolbar-items>
      <theme-switcher />
      <lang-switcher />
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        text
        :to="link.to"
        nuxt
        exact
        active-class="primary"
        >{{ link.text }}</v-btn
      >
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {
  get links() {
    return [
      { text: this.$t('aboutLink'), to: this.localePath('/') },
      { text: this.$t('contactLink'), to: this.localePath('/contact') },
    ]
  }

  get color() {
    return this.$vuetify.theme.dark ? 'black' : 'white'
  }
}
</script>

<i18n lang="yaml">
en:
  aboutLink: About me
  contactLink: Contact
es:
  aboutLink: Sobre mí
  contactLink: Contacto
</i18n>

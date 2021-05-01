<template>
  <v-app-bar fixed app flat color="transparent">
    <v-toolbar-title v-text="'David Espínola Pérez'" />
    <v-spacer />
    <v-toolbar-items class="hidden-print-only">
      <theme-switcher />
      <lang-switcher />
      <v-btn text :to="localePath('/')" nuxt exact>{{ $t('aboutLink') }}</v-btn>
      <v-btn text :to="localePath('/contact')" nuxt exact>{{
        $t('contactLink')
      }}</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {}
</script>

<i18n lang="yaml">
en:
  aboutLink: 'About me'
  contactLink: 'Contact'
es:
  aboutLink: 'Sobre mí'
  contactLink: 'Contacto'
</i18n>

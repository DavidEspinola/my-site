<template>
  <v-menu offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('title') }}</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item-group v-model="selectedLocale" color="primary">
        <v-list-item v-for="locale in availableLocales" :key="locale.code">
          <v-list-item-title>{{ locale.name }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { LocaleObject } from 'nuxt-i18n/types'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class LangSwitcher extends Vue {
  selectedLocale: number | null = null

  mounted() {
    this.selectedLocale = this.availableLocales.findIndex(
      (locale) => locale.code === this.$i18n.locale
    )
  }

  get availableLocales() {
    return this.$i18n.locales as LocaleObject[]
  }

  @Watch('selectedLocale')
  changeLocale() {
    this.$i18n.setLocale(this.availableLocales[this.selectedLocale!].code)
  }
}
</script>

<i18n lang="yaml">
en:
  title: Change language
es:
  title: Cambiar idioma
</i18n>

<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-h2 mb-4 hidden-print-only">{{ $t('title') }}</h1>
      <div class="social-links d-flex flex-wrap mb-4">
        <a
          v-for="(link, index) in about.socialLinks"
          :key="index"
          :href="link.url"
          target="_blank"
          class="text-decoration-none primary--text font-weight-medium"
        >
          <v-icon>mdi-{{ link.icon }}</v-icon>
          <span class="hidden-print-only">{{ link.userName }}</span>
          <span class="hidden-screen-only">{{ linkText(link.url) }}</span>
        </a>
      </div>
      <nuxt-content :document="about" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IContentDocument } from '@nuxt/content/types/content'

@Component<PageIndex>({
  async fetch() {
    const [about] = (await this.$content('about')
      .where({
        lang: this.$i18n.locale,
      })
      .fetch()) as IContentDocument[]

    this.about = about
  },
})
export default class PageIndex extends Vue {
  about: IContentDocument | null = null

  linkText(url: string) {
    return url.replace('http://', '').replace('https://', '')
  }
}
</script>

<i18n lang="yaml">
en:
  title: 'About me'
es:
  title: 'Sobre mí'
</i18n>

<style scoped>
.social-links {
  gap: 16px;
}
</style>

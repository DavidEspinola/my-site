<template>
  <v-row v-if="about">
    <v-col cols="12">
      <h1 class="text-h2 mb-4 hidden-print-only">
        {{ $t('title') }}
      </h1>
      <div class="d-flex flex-wrap mb-4 c-gap-4 r-gap-1">
        <span>
          <v-icon>mdi-map-marker</v-icon>
          {{ about.location }}
        </span>

        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.url"
          target="_blank"
          class="text-decoration-none primary--text font-weight-medium"
          :class="link.class"
        >
          <v-icon>mdi-{{ link.icon }}</v-icon>
          <span class="hidden-print-only">{{ link.userName }}</span>
          <span class="hidden-screen-only">{{ linkText(link.url) }}</span>
        </a>
      </div>
      <nuxt-content :document="about" />

      <h2 class="text-h4 mb-4 section-title pb-1">
        {{ $t('experience') }}
      </h2>
      <company-experience-component
        v-for="(exp, index) in experiences"
        :key="index"
        :experience="exp"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IContentDocument } from '@nuxt/content/types/content'

const lorem =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam doloribus nesciunt est laudantium, perferendis voluptatum quidem, harum at, asperiores molestias mollitia quia beatae maxime voluptate commodi hic aspernatur iure cupiditate.'

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

  experiences = [
    {
      startYear: 2010,
      startMonth: 2,
      endYear: 2015,
      endMonth: 8,
      title: 'Programador front',
      company: 'Instituto Europeo de Postgrado',
      projects: [
        {
          logo: 'iep-logo.png',
          title: 'IEP',
          client: 'IEP',
          description: lorem,
          skills: [
            'Angular.js',
            'Server administration',
            'jQuery',
            'Bootstrap',
          ],
        },
      ],
    },
    {
      startYear: 2010,
      startMonth: 3,
      endYear: 2012,
      endMonth: 8,
      title: 'Programador front',
      company: 'Everis',
      projects: [
        {
          logo: 'vodafone-logo.png',
          title: 'Vodafone',
          client: 'Vodafone',
          description: lorem,
          skills: ['Angular.js', 'Sass', 'Grunt', 'Gulp', 'Git'],
        },
        {
          logo: 'masmovil-logo.png',
          title: 'Más Móvil',
          client: 'Más Móvil',
          description: lorem,
          skills: ['SPA'],
        },
        {
          logo: 'orange-logo.png',
          title: 'Orange',
          client: 'Orange',
          description: lorem,
          skills: ['Angular.js', 'Git'],
        },
        {
          logo: 'mutua-logo.png',
          title: 'Mutua Madrileña',
          client: 'Mutua Madrileña',
          description: lorem,
          skills: ['SPA', 'SEO', 'SSR'],
        },
      ],
    },
    {
      startYear: 2010,
      startMonth: 2,
      endYear: 2015,
      endMonth: 8,
      title: 'Programador front',
      company: 'Randstad y FCC',
      projects: [
        {
          logo: 'otan-logo.png',
          title: 'OTAN',
          client: 'OTAN',
          description: lorem,
        },
      ],
      skills: ['Angular.js', 'SCRUM', 'Gulp', 'English'],
    },
    {
      startYear: 2010,
      startMonth: 2,
      endYear: 2015,
      endMonth: 8,
      title: 'Programador front',
      company: 'Accenture',
      projects: [
        {
          logo: 'nh-logo.png',
          title: 'NH Hoteles',
          client: 'NH Hoteles',
          description: lorem,
          skills: ['Databases', 'BI'],
        },
        {
          logo: 'fcc-logo.png',
          title: 'FCC',
          client: 'FCC',
          description: lorem,
          skills: [],
        },
      ],
    },
    {
      startYear: 2010,
      startMonth: 2,
      endYear: 2015,
      endMonth: 8,
      title: 'Programador front',
      company: 'Sopra',
      projects: [
        {
          logo: 'ing-logo.jpeg',
          title: 'ING',
          client: 'ING',
          description: lorem,
          skills: ['Polymer', 'Webpack', 'SCRUM', 'Git'],
        },
        {
          logo: 'santander-logo.png',
          title: 'Banco Santander',
          client: 'Banco Santander',
          description: lorem,
          skills: [
            'Angular',
            'React',
            'Vue',
            'Typescript',
            'Webpack',
            'SCRUM',
            'Git',
          ],
        },
      ],
    },
    {
      startYear: 2010,
      startMonth: 2,
      endYear: 2015,
      endMonth: 8,
      title: 'Programador front',
      company: 'Quality Objects',
      projects: [
        {
          logo: 'ono-logo.png',
          title: 'ONO',
          description: lorem,
          skills: ['jQuery', 'JSP', 'NodeJS'],
        },
      ],
    },
  ]

  get links() {
    const webUrl = process.client ? window.location.href : ''

    return [
      {
        url: webUrl,
        userName: webUrl,
        icon: 'web',
        class: 'hidden-screen-only',
      },
      ...this.about!.socialLinks,
    ]
  }

  linkText(url: string) {
    return url.replace('http://', '').replace('https://', '')
  }
}
</script>

<i18n lang="yaml">
en:
  title: 'About me'
  experience: 'Experience'
es:
  title: 'Sobre mí'
  experience: 'Experiencia'
</i18n>

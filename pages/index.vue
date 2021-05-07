<template>
  <div v-if="about && skills">
    <v-row>
      <v-col v-bind="leftColProps">
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
      </v-col>
      <v-col v-bind="rightColProps"></v-col>
    </v-row>
    <v-row>
      <v-col v-bind="leftColProps">
        <h2 class="text-h4 mb-4 section-title">
          {{ $t('experience') }}
        </h2>
        <company-experience-component
          v-for="(exp, index) in experiences"
          :key="index"
          :experience="exp"
        />
      </v-col>
      <v-col v-bind="rightColProps">
        <h2 class="text-h4 mb-4 section-title">
          {{ $t('skills') }}
        </h2>
        <div class="skill-list">
          <template v-for="(skill, index) in skills">
            <div :key="'name' + index" class="text-caption">
              {{ skill.name }}
            </div>
            <v-progress-linear
              :key="'rate' + index"
              height="6"
              :value="skill.rate * 20"
            />
          </template>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IContentDocument } from '@nuxt/content/types/content'

const lorem =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam doloribus nesciunt est laudantium, perferendis voluptatum quidem, harum at, asperiores molestias mollitia quia beatae maxime voluptate commodi hic aspernatur iure cupiditate.'

@Component<PageIndex>({
  async fetch() {
    const langFilter = {
      lang: this.$i18n.locale,
    }
    const aboutPromise = this.$content('about').where(langFilter).fetch()
    const skillsPromise = this.$content('skills').where(langFilter).fetch()

    const [about, skills] = await Promise.all([aboutPromise, skillsPromise])
    this.about = (about as IContentDocument)[0]
    this.skills = (skills as IContentDocument)[0].skills
  },
})
export default class PageIndex extends Vue {
  about: IContentDocument | null = null
  skills: IContentDocument | null = null

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

  leftColProps = {
    cols: 12,
    sm: 8,
    offsetSm: 2,
    md: 6,
    offsetMd: 0,
    lg: 5,
    offsetLg: 1,
    xl: 4,
    offsetXl: 2,
  }

  rightColProps = {
    cols: 12,
    sm: 8,
    offsetSm: 2,
    md: 6,
    offsetMd: 0,
    lg: 4,
    offsetLg: 1,
    xl: 3,
    offsetXl: 1,
  }

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
  skills: 'Skills'
es:
  title: 'Sobre mí'
  experience: 'Experiencia'
  skills: 'Conocimientos'
</i18n>

<style lang="scss" scoped>
.skill-list {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 16px;
  color-adjust: exact;
}
</style>

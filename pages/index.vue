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
      <v-col v-bind="rightColProps" class="pa-0"></v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col v-bind="leftColProps">
        <h2 class="text-h4 mb-4 section-title">
          {{ $t('experience') }}
        </h2>
        <milestone-component
          v-for="(exp, index) in experiences"
          :key="index"
          :milestone="exp"
        />
      </v-col>
      <v-col v-bind="rightColProps">
        <v-row>
          <v-col cols="12">
            <h2 class="text-h4 mb-4 section-title">
              {{ $t('skills') }}
            </h2>
            <SkillList :skills="skills" />
          </v-col>

          <v-col cols="12">
            <h2 class="text-h4 mb-4 section-title">
              {{ $t('languages') }}
            </h2>
            <SkillList :skills="languages" />
          </v-col>

          <v-col cols="12" class="education">
            <h2 class="text-h4 mb-4 section-title">
              {{ $t('education') }}
            </h2>
            <milestone-component
              v-for="(study, index) in studies"
              :key="index"
              :milestone="study"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IContentDocument } from '@nuxt/content/types/content'
import { Milestone } from '~/types/Milestone'
import { ContentService } from '~/utils/ContentService'

const lorem =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam doloribus nesciunt est laudantium, perferendis voluptatum quidem, harum at, asperiores molestias mollitia quia beatae maxime voluptate commodi hic aspernatur iure cupiditate.'

@Component<PageIndex>({
  async fetch() {
    const contentService = new ContentService(this.$content)
    const lang = this.$i18n.locale

    const aboutPromise = this.$content('about').where({ lang }).fetch()
    const skillsPromise = this.$content('skills').where({ lang }).fetch()
    const languagesPromise = this.$content('languages').where({ lang }).fetch()

    const studiesPromise = contentService.getMilestones('studies', lang)
    const experiencesPromise = contentService.getMilestones('experiences', lang)

    const [about, skills, languages, studies, experiences] = await Promise.all([
      aboutPromise,
      skillsPromise,
      languagesPromise,
      studiesPromise,
      experiencesPromise,
    ])

    this.about = (about as IContentDocument)[0]
    this.skills = (skills as IContentDocument)[0].skills
    this.languages = (languages as IContentDocument)[0].languages
    this.studies = studies
    this.experiences = experiences
  },
})
export default class PageIndex extends Vue {
  about: IContentDocument | null = null
  skills: IContentDocument | null = null
  languages: IContentDocument | null = null
  studies: Milestone[] | null = null
  experiences: Milestone[] | null = null

  experiencesOLD = [
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
  title: About me
  experience: Experience
  skills: Skills
  languages: Languages
  education: Education
es:
  title: Sobre mí
  experience: Experiencia
  skills: Conocimientos
  languages: Idiomas
  education: Educación
</i18n>

<style lang="scss" scoped>
@media print {
  .education {
    order: -1;
  }
}
</style>

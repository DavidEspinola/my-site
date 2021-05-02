<template>
  <div class="company-experience">
    <div class="text-h6">
      {{ experience.title }}
    </div>
    <div class="mb-2 d-flex flex-wrap align-center c-gap-2">
      <span class="text-subtitle-1">{{ experience.company }}</span>
      <span class="text-caption grey--text">
        <v-icon small color="grey">mdi-calendar-month</v-icon>
        {{ interval }}
      </span>
      <span class="text-caption grey--text">
        <v-icon small color="grey">mdi-clock-time-two-outline</v-icon>
        {{ duration }}
      </span>
    </div>

    <project-component
      v-for="(project, index) in experience.projects"
      :key="index"
      :project="project"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CompanyExperience } from '@/types/CompanyExperience'

import endOfMonth from 'date-fns/endOfMonth'
import intervalToDuration from 'date-fns/intervalToDuration'
import formatDuration from 'date-fns/formatDuration'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import upperFirst from 'lodash/upperFirst'

@Component
export default class CompanyExperienceComponent extends Vue {
  @Prop({ type: Object, required: true }) experience!: CompanyExperience

  get duration() {
    return formatDuration(
      intervalToDuration({ start: this.startDate, end: this.endDate }),
      {
        format: ['years', 'months'],
        locale: this.locale,
      }
    )
  }

  get interval() {
    const { endYear, endMonth } = this.experience
    const notEnded = !endYear || !endMonth

    const startDate = this.formatDate(this.startDate)
    const endDate = notEnded ? this.$t('now') : this.formatDate(this.endDate)

    return `${startDate} - ${endDate}`
  }

  get startDate() {
    const { startYear, startMonth } = this.experience
    return new Date(startYear, startMonth - 1, 1)
  }

  get endDate() {
    const now = new Date()
    const {
      endYear = now.getFullYear(),
      endMonth = now.getMonth() + 1,
    } = this.experience

    return endOfMonth(new Date(endYear, endMonth - 1, 1))
  }

  get locale() {
    return this.$i18n.locale === 'es' ? es : undefined
  }

  formatDate(date: Date) {
    const dateFormat = 'MMM Y'
    return upperFirst(
      format(date, dateFormat, {
        locale: this.locale,
      })
    )
  }
}
</script>

<i18n lang="yaml">
en:
  now: 'Now'
es:
  now: 'Ahora'
</i18n>

<template>
  <div class="title-dates">
    <div class="mb-2 d-flex flex-wrap align-center c-gap-2">
      <span v-if="title" class="text-subtitle-1">{{ title }}</span>
      <span class="text-caption grey--text">
        <v-icon small color="grey">mdi-calendar-month</v-icon>
        {{ interval }}
      </span>
      <span class="text-caption grey--text">
        <v-icon small color="grey">mdi-clock-time-two-outline</v-icon>
        {{ duration }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import intervalToDuration from 'date-fns/intervalToDuration'
import formatDuration from 'date-fns/formatDuration'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import upperFirst from 'lodash/upperFirst'

@Component
export default class TitleDates extends Vue {
  @Prop({ type: String }) title?: string
  @Prop({ type: Date, required: true }) startDate!: Date
  @Prop({ type: Date }) endDate?: Date

  get duration() {
    let endDate = this.endDate
    if (!endDate) {
      endDate = new Date()
    }

    const duration = intervalToDuration({ start: this.startDate, end: endDate })
    const lessThanMonth = !duration.years && !duration.months

    return formatDuration(duration, {
      format: lessThanMonth ? ['days'] : ['years', 'months'],
      locale: this.locale,
    })
  }

  get interval() {
    const startDate = this.formatDate(this.startDate)
    const endDate = !this.endDate
      ? this.$t('now')
      : this.formatDate(this.endDate)

    return `${startDate} - ${endDate}`
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
  now: Now
es:
  now: Ahora
</i18n>

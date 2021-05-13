<template>
  <span
    v-if="startDate && duration"
    class="dates-duration text-caption grey--text"
  >
    <v-icon small color="grey">mdi-clock-time-two-outline</v-icon>
    {{ duration }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import intervalToDuration from 'date-fns/intervalToDuration'
import formatDuration from 'date-fns/formatDuration'
import es from 'date-fns/locale/es'

@Component
export default class DatesDuration extends Vue {
  @Prop({ type: Number }) startMonth?: number
  @Prop({ type: Number }) startYear?: number

  @Prop({ type: Number }) endMonth?: number
  @Prop({ type: Number }) endYear?: number

  get startDate() {
    if (!this.startYear || !this.startMonth) return
    return new Date(this.startYear, this.startMonth - 1, 1)
  }

  get endDate() {
    if (!this.endYear || !this.endMonth) return
    return new Date(this.endYear, this.endMonth - 1, 1)
  }

  get duration() {
    let endDate = this.endDate
    if (!endDate) {
      endDate = new Date()
    }

    const duration = intervalToDuration({
      start: this.startDate!,
      end: endDate,
    })
    const lessThanMonth = !duration.years && !duration.months

    return formatDuration(duration, {
      format: lessThanMonth ? ['days'] : ['years', 'months'],
      locale: this.locale,
    })
  }

  get locale() {
    return this.$i18n.locale === 'es' ? es : undefined
  }
}
</script>

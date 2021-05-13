<template>
  <span v-if="startDate" class="dates-interval text-caption grey--text">
    <v-icon small color="grey">mdi-calendar-month</v-icon>
    {{ interval }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import upperFirst from 'lodash/upperFirst'

@Component
export default class DatesInterval extends Vue {
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

  get interval() {
    const startDate = this.formatDate(this.startDate!)
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

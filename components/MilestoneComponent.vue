<template>
  <div :class="rootClass" class="milestone">
    <div v-if="content.header" class="header text-h6">
      {{ content.header }}
    </div>

    <div class="details d-flex mb-2 c-gap-4">
      <v-avatar v-if="content.logo" tile size="36">
        <img
          class="logo"
          :src="require(`~/assets/logos/${content.logo}`)"
          :alt="content.logoAlt || 'Logo'"
        />
      </v-avatar>
      <div>
        <div
          v-if="haveTitleOrDates"
          class="title-dates mb-2 d-flex flex-wrap align-center c-gap-2"
        >
          <span v-if="content.title" :class="titleClass">{{
            content.title
          }}</span>
          <dates-interval
            :start-month="content.startMonth"
            :start-year="content.startYear"
            :end-month="content.endMonth"
            :end-year="content.endYear"
          />
          <dates-duration
            :start-month="content.startMonth"
            :start-year="content.startYear"
            :end-month="content.endMonth"
            :end-year="content.endYear"
          />
        </div>

        <nuxt-content class="text-body-2" :document="content" />
        <div
          v-if="content.skills && content.skills.length"
          class="my-2 d-flex flex-wrap c-gap-1 r-gap-1"
        >
          <v-chip
            v-for="(skill, index) in content.skills || []"
            :key="index"
            color="blue"
            small
            outlined
          >
            {{ skill }}
          </v-chip>
        </div>
      </div>
    </div>

    <milestone-component
      v-for="(subMilestone, index) in milestone.subMilestones"
      :key="index"
      :milestone="subMilestone"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Milestone, SubMilestone } from '~/types/Milestone'

@Component
export default class MilestoneComponent extends Vue {
  @Prop({ type: Object, required: true }) milestone!: Milestone | SubMilestone

  get isSubMilestone() {
    return !this.milestone.content.header
  }

  get content() {
    return this.milestone.content
  }

  get haveTitleOrDates() {
    return (
      (this.content.startYear && this.content.startMonth) || this.content.title
    )
  }

  get rootClass() {
    return this.isSubMilestone ? 'submilestone' : ''
  }

  get titleClass() {
    return this.isSubMilestone ? 'text-subtitle-2' : 'text-subtitle-1'
  }
}
</script>
<style lang="scss" scoped>
.milestone {
  .nuxt-content {
    p:last-child {
      margin-bottom: 0;
    }
  }

  .logo {
    filter: grayscale(100%);
    opacity: 0.6;
  }

  .details:hover .logo {
    filter: none;
    opacity: 1;
  }
}

@media print {
  .milestone {
    .header,
    .title-dates {
      break-after: avoid;
    }
    &.submilestone {
      break-inside: avoid;
    }
  }
}
</style>

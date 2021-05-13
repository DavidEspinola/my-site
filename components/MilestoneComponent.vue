<template>
  <div class="milestone">
    <div v-if="milestone.header" class="text-h6">
      {{ milestone.header }}
    </div>

    <div class="details d-flex mb-2 c-gap-4">
      <v-avatar v-if="milestone.logo" tile size="36">
        <img
          class="logo"
          :src="require(`~/assets/logos/${milestone.logo}`)"
          :alt="milestone.logoAlt || 'Logo'"
        />
      </v-avatar>
      <div>
        <div
          v-if="haveTitleOrDates"
          class="mb-2 d-flex flex-wrap align-center c-gap-2"
        >
          <span v-if="milestone.title" :class="titleClass">{{
            milestone.title
          }}</span>
          <dates-interval
            :start-month="milestone.startMonth"
            :start-year="milestone.startYear"
            :end-month="milestone.endMonth"
            :end-year="milestone.endYear"
          />
          <dates-duration
            :start-month="milestone.startMonth"
            :start-year="milestone.startYear"
            :end-month="milestone.endMonth"
            :end-year="milestone.endYear"
          />
        </div>

        <nuxt-content class="text-body-2" :document="milestone" />
        <div
          v-if="milestone.skills && milestone.skills.length"
          class="my-2 d-flex flex-wrap c-gap-1 r-gap-1"
        >
          <v-chip
            v-for="(skill, index) in milestone.skills || []"
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
    return !this.milestone.header
  }

  get haveTitleOrDates() {
    return (
      (this.milestone.startYear && this.milestone.startMonth) ||
      this.milestone.title
    )
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
</style>

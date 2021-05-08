<template>
  <div class="company-experience">
    <div class="text-h6">
      {{ experience.title }}
    </div>
    <title-dates
      :title="experience.company"
      :start-date="startDate"
      :end-date="endDate"
    ></title-dates>

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

@Component
export default class CompanyExperienceComponent extends Vue {
  @Prop({ type: Object, required: true }) experience!: CompanyExperience

  get startDate() {
    const { startYear, startMonth } = this.experience
    return new Date(startYear, startMonth - 1, 1)
  }

  get endDate() {
    const { endYear, endMonth } = this.experience
    if (!endYear || !endMonth) return
    return new Date(endYear, endMonth - 1, 1)
  }
}
</script>

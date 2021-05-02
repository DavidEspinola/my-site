<template>
  <div class="project d-flex mb-2 c-gap-4">
    <v-avatar tile size="36">
      <img
        class="logo"
        :src="require(`~/assets/logos/${project.logo}`)"
        :alt="`${project.client} logo`"
      />
    </v-avatar>
    <div>
      <div class="text-subtitle-2">{{ project.title }}</div>
      <div class="text-body-2">{{ project.description }}</div>
      <div class="text-caption">Prueba</div>
      <v-chip
        class="my-2"
        color="blue accent-1"
        small
        outlined
        @click="chipAction"
        >x-small chip</v-chip
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Project } from '@/types/Project'

@Component
export default class ProjectComponent extends Vue {
  @Prop({ type: Object, required: true }) project!: Project

  chipAction() {
    console.log('chip!')
  }
}
</script>

<style lang="scss" scoped>
.project {
  .logo {
    filter: grayscale(100%);
    opacity: 0.6;
  }

  &:hover .logo {
    filter: none;
    opacity: 1;
  }
}

@media print {
  .project {
    break-inside: avoid;
  }
}
</style>

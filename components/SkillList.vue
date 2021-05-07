<template>
  <div class="skill-list r-gap-2">
    <div v-for="(skill, index) in skills" :key="index">
      <div class="text-caption">
        {{ skill.name }}
      </div>
      <v-rating
        color="primary"
        readonly
        empty-icon="mdi-circle-outline"
        full-icon="mdi-circle"
        half-increments
        dense
        length="5"
        size="16"
        :value="skill.rate"
      ></v-rating>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SkillList extends Vue {
  @Prop({ type: Array, required: true }) skills!: SkillList[]
}
</script>

<style lang="scss" scoped>
.skill-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  column-gap: 16px;
  color-adjust: exact;
}
</style>

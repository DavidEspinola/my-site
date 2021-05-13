import { IContentDocument } from '@nuxt/content/types/content'

export interface Milestone extends IContentDocument {
  header: string
  title?: string

  startYear?: number
  startMonth?: number
  endYear?: number
  endMonth?: number

  skills?: string[]
  subMilestones?: SubMilestone[]

  logo?: string
  logoAlt?: string
}

export interface SubMilestone
  extends Omit<Milestone, 'subMilestones' | 'header'> {}

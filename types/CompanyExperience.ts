import { Project } from './Project'

export interface CompanyExperience {
  startYear: number
  startMonth: number
  endYear?: number
  endMonth?: number
  title: string
  company: string
  projects: Project[]
}

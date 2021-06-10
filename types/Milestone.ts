import { IContentDocument } from '@nuxt/content/types/content'
import v8n from 'v8n'
import { month } from '~/utils/validations'

export interface SubMilestoneDTO extends IContentDocument {
  title?: string

  startYear?: number
  startMonth?: number
  endYear?: number
  endMonth?: number

  skills?: string[]

  logo?: string
  logoAlt?: string
}

export interface MilestoneDTO extends SubMilestoneDTO {
  header: string
  subMilestones?: string[]
}

export class SubMilestone {
  readonly content: SubMilestoneDTO

  constructor(dto: SubMilestoneDTO) {
    this.validate(dto)
    this.content = dto
  }

  protected validate(dto: SubMilestoneDTO) {
    v8n().optional(v8n().string()).check(dto.title)

    v8n().optional(v8n().number()).check(dto.endYear)
    v8n().optional(month).check(dto.endMonth)

    if (dto.endYear && dto.endMonth) {
      month.check(dto.startMonth)
      v8n().number().check(dto.startYear)
    } else {
      v8n().optional(month).check(dto.startMonth)
      v8n().optional(v8n().number()).check(dto.startYear)
    }
  }
}

export class Milestone extends SubMilestone {
  readonly content: MilestoneDTO
  readonly subMilestones: SubMilestone[]

  constructor(dto: MilestoneDTO, subMilestones: SubMilestone[]) {
    super(dto)
    this.validate(dto)
    this.content = dto
    this.subMilestones = subMilestones
  }

  protected validate(dto: MilestoneDTO) {
    super.validate(dto)
    v8n().string().check(dto.header)
  }
}

import { contentFunc } from '@nuxt/content/types/content'
import orderBy from 'lodash/orderBy'
import {
  Milestone,
  MilestoneDTO,
  SubMilestone,
  SubMilestoneDTO,
} from '~/types/Milestone'

export class ContentService {
  private $content: contentFunc

  constructor($content: contentFunc) {
    this.$content = $content
  }

  async getMilestones(path: string, locale: string) {
    const milestoneDTOs = await (this.$content(path)
      .sortBy('milestone_end_date', 'desc')
      .sortBy('milestone_start_date', 'desc')
      .where({ lang: locale })
      .fetch<MilestoneDTO>() as Promise<MilestoneDTO[]>)

    const milestones: Milestone[] = await Promise.all(
      milestoneDTOs.map(async (milestone) => {
        const subMilestones = await this.getSubMilestones(milestone)
        return new Milestone(milestone, subMilestones)
      })
    )

    return milestones
  }

  async getSubMilestones(milestone: MilestoneDTO) {
    const { subMilestones: paths = [] } = milestone
    const subMilestones = await Promise.all(
      paths.map(
        (path) =>
          this.$content(
            path
          ).fetch<SubMilestoneDTO>() as Promise<SubMilestoneDTO>
      )
    )

    return orderBy(
      subMilestones,
      ['milestone_end_date', 'milestone_start_date'],
      ['desc', 'desc']
    ).map((subMilestone) => new SubMilestone(subMilestone))
  }
}

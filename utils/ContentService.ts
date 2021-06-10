import { $content } from '@nuxt/content'
import orderBy from 'lodash/orderBy'
import {
  Milestone,
  MilestoneDTO,
  SubMilestone,
  SubMilestoneDTO,
} from '~/types/Milestone'

export class ContentService {
  static async getMilestones(path: string, locale: string) {
    const milestoneDTOs = await ($content(path)
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

    /*
    return (milestones as IContentDocument).map((exp: any) => ({
      ...exp,
      subMilestones: (exp.subMilestones || []).map(
        (subMilestone: string) =>
          projects[subMilestonesUrls.findIndex((url) => url === subMilestone)]
      ),
    }))
    */
  }

  static async getSubMilestones(milestone: MilestoneDTO) {
    const { subMilestones: paths = [] } = milestone
    const subMilestones = await Promise.all(
      paths.map(
        (path) =>
          $content(path).fetch<SubMilestoneDTO>() as Promise<SubMilestoneDTO>
      )
    )

    return orderBy(
      subMilestones,
      ['milestone_end_date', 'milestone_start_date'],
      ['desc', 'desc']
    ).map((subMilestone) => new SubMilestone(subMilestone))
  }
}

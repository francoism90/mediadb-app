import { PaginateEntity } from './paginate'

export interface VideoEntity extends PaginateEntity {
  type: string | null,
  views: number | null,
  'release_date': Date | null,
  'season_number': number | null,
  'episode_number': number | null,

}

import { Model, ModelResponse, RepositoryMeta, RepositoryParameters, RepositoryResponse } from './repository'
import { Media } from './media'

export interface Video extends Model {
  overview?: string | null,
  type?: string | null,
  views?: number | null,
  clip?: Media,
  'release_date'?: Date | null,
  'season_number'?: number | null,
  'episode_number'?: number | null,
}

export interface VideoResponse extends ModelResponse {
  data: Video,
}

export interface VideosResponse extends RepositoryResponse {
  data: Video[],
  meta: RepositoryMeta
}

export interface VideosParameters extends RepositoryParameters {
  query?: string | null
}
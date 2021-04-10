import { Model, ModelResponse, RepositoryMeta, RepositoryParameters, RepositoryResponse } from './repository'

export interface Video extends Model {
  type?: string | null,
  views?: number | null,
  'release_date'?: Date | null,
  'season_number'?: number | null,
  'episode_number'?: number | null,
}

export interface VideoResponse extends ModelResponse {
  data: Video,
  meta: null
}

export interface VideosResponse extends RepositoryResponse {
  data: Video[],
  meta: RepositoryMeta
}

export interface VideosParameters extends RepositoryParameters {
  query?: string | null
}

import { Media } from 'src/interfaces/media';
import {
  Model, ModelResponse, RepositoryMeta, RepositoryParams, RepositoryResponse,
} from 'src/interfaces/repository';
import { Tag } from 'src/interfaces/tag';

export interface Video extends Model {
  tags?: Tag[],
  status?: 'public' | 'private',
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

export interface VideosParameters extends RepositoryParams {
  'filter[favorites]'?: number | null,
  'filter[related]'?: number | string | null,
  query?: string | null,
}

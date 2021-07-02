import { MediaModel } from 'src/interfaces/media';
import {
  Model, RepositoryLinks, RepositoryMeta, RepositoryQuery,
} from 'src/interfaces/repository';
import { TagModel } from 'src/interfaces/tag';

export type VideosMeta = RepositoryMeta
export type VideosLinks = RepositoryLinks

export interface VideoModel extends Model {
  type: string,
  'season_number': string,
  'episode_number': string,
  'release_date': Date | string,
  status: string,
  views: number,
  clip?: MediaModel,
  tracks?: MediaModel,
  model?: Model,
  tags?: TagModel[],
  favorite?: boolean,
  overview?: string,
}

export interface VideoResponse {
  data: VideoModel,
  meta: null,
}

export interface VideosFilters {
  favorites?: number | null,
  related?: string | string[] | null,
  query?: string | null,
  tags?: string[] | null,
}

export interface VideosQuery extends RepositoryQuery {
  filter?: VideosFilters,
}

export interface VideosState {
  ready: boolean,
  id: string | number | null,
  query: VideosQuery,
  data: VideoModel[],
  meta: VideosMeta,
  links: VideosLinks,
}

export interface VideosResponse {
  data: VideoModel[],
  meta: VideosMeta,
  links: VideosLinks
}

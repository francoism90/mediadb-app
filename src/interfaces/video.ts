import { MediaModel } from 'src/interfaces/media';
import { Model, RepositoryLinks, RepositoryMeta, RepositoryQuery } from 'src/interfaces/repository';
import { TagModel } from 'src/interfaces/tag';

export type VideosMeta = RepositoryMeta
export type VideosLinks = RepositoryLinks

export interface VideoModel extends Model {
  'episode_number': string,
  'release_date': string,
  'season_number': string,
  'live_url'?: string
  'poster_url'?: string
  'sprite_url'?: string
  'vod_url'?: string
  clip?: MediaModel,
  model?: Model,
  overview?: string,
  status: string,
  tags?: TagModel[],
  type: string,
  views: number,
}

export interface VideoResponse {
  data: VideoModel,
  meta: null,
}

export interface VideosFilters {
  query?: string | null,
  similar?: string | string[] | null,
  tags?: string[] | null,
  type?: string | null,
}

export interface VideosQuery extends RepositoryQuery {
  filter?: VideosFilters,
}

export interface VideoState {
  data: VideoModel,
  meta: null,
}

export interface VideosState {
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

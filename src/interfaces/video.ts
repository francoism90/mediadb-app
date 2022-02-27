import { MediaModel, Model, RepositoryLinks, RepositoryMeta, RepositoryParams, TagModel } from 'src/interfaces';

export interface VideoModel extends Model {
  id: string,
  slug: string,
  'dash_url'?: string
  'production_code': string,
  'episode_number': string,
  'season_number': string,
  'poster_url'?: string
  'released_at'?: string,
  'sprite_url'?: string
  name: string,
  title: string,
  duration: number,
  quality: string,
  clips?: MediaModel[],
  model?: Model,
  overview?: string,
  status?: string,
  tags?: TagModel[],
  thumbnail?: number,
  type?: string,
  views?: number,
}

export interface VideoState {
  data: VideoModel | undefined,
  meta: object | undefined,
  error: unknown | undefined,
}

export interface VideoResponse {
  data: VideoModel | undefined,
  meta: object | undefined,
}

export interface VideosState {
  id: number,
  data: VideoModel[] | undefined,
  meta: RepositoryMeta | undefined,
  links: RepositoryLinks | undefined,
  error: unknown | undefined,
}

export interface VideosResponse {
  data: VideoModel[] | undefined,
  meta: RepositoryMeta | undefined,
  links: RepositoryLinks | undefined,
}

export interface VideosParams extends RepositoryParams {
  features?: string | string[] | null,
  type?: string | string[] | null,
  tags?: string | string[] | null,
}

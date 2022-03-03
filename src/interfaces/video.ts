import { MediaModel, Model, RepositoryLinks, RepositoryMeta, TagModel } from 'src/interfaces';

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
  clips?: Readonly<MediaModel[]>,
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

export interface VideosFilters {
  features?: string | null,
  query?: string | null,
  sort?: string | null,
  type?: string | null,
}

export interface VideosState {
  id: number | string | null,
  data: VideoModel[],
  meta: RepositoryMeta | undefined,
  links: RepositoryLinks | undefined,
  error: unknown | undefined,
  filters: VideosFilters | undefined,
}

export interface VideosResponse {
  data: VideoModel[],
  meta: RepositoryMeta | undefined,
  links: RepositoryLinks | undefined,
}

import { MediaModel } from 'src/interfaces/media';
import { TagModel } from 'src/interfaces/tag';

export interface VideoModel {
  id: string,
  slug: string,
  name: string,
  description: string,
  clip: MediaModel | null,
  'created_at': Date,
  'updated_at': Date,
  favorite?: boolean,
}

export interface VideoResponse {
  data: TagModel,
  meta: null,
}

export interface VideosMeta {
  'current_page'?: number,
  'last_page'?: number,
  'per_page'?: number,
  from?: number,
  path?: string,
  to?: number,
  total?: number,
}

export interface VideosLinks {
  first: string | null,
  last: string | null,
  next: string | null,
  prev: string | null,
}

export interface VideosParameters {
  include: string[] | null,
  fields: string[] | null,
  append: string[] | null,
  sort: string | string[] | null,
  'page[number]': number | null,
  'page[size]': number | null,
}

export interface VideosFilters {
  actors: TagModel[] | null,
  genres: TagModel[] | null,
  languages: TagModel[] | null,
  studios: TagModel[] | null,
}

export interface VideosState {
  ready: boolean,
  id: string | number | null,
  parameters: VideosParameters,
  filters: VideosFilters,
  items: VideoModel[],
  meta: VideosMeta,
  links: VideosLinks,
}

export interface VideosResponse {
  data: VideoModel[],
  meta: VideosMeta,
  links: VideosLinks
}

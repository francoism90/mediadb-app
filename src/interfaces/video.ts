import { MediaModel } from 'src/interfaces/media';
import {
  Model, RepositoryLinks, RepositoryMeta, RepositoryQuery,
} from 'src/interfaces/repository';

export type VideosMeta = RepositoryMeta
export type VideosLinks = RepositoryLinks

export interface VideoModel extends Model {
  clip: MediaModel | null,
  favorite?: boolean,
}

export interface VideoResponse {
  data: VideoModel,
  meta: null,
}

export interface VideosFilters {
  query: string | null,
  favorites: number | null,
  actors: string[] | null,
  genres: string[] | null,
  languages: string[] | null,
  studios: string[] | null,
}

export interface VideosQuery extends RepositoryQuery {
  filter: VideosFilters,
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

import { MediaModel } from 'src/interfaces/media';
import {
  Model, RepositoryLinks, RepositoryMeta, RepositoryParameters,
} from 'src/interfaces/repository';
import { TagModel } from 'src/interfaces/tag';

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
  actors: TagModel[] | null,
  genres: TagModel[] | null,
  languages: TagModel[] | null,
  studios: TagModel[] | null,
}

export interface VideosParameters extends RepositoryParameters {
  filter: VideosFilters
}

export interface VideosState {
  ready: boolean,
  id: string | number | null,
  parameters: VideosParameters,
  items: VideoModel[],
  meta: VideosMeta,
  links: VideosLinks,
}

export interface VideosResponse {
  data: VideoModel[],
  meta: VideosMeta,
  links: VideosLinks
}

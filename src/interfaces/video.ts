import { MediaModel } from 'src/interfaces/media';
import { RepositoryLinks, RepositoryMeta, RepositoryQuery, RepositoryResponse } from 'src/interfaces/repository';
import { TagModel } from 'src/interfaces/tag';
import { UserModel } from 'src/interfaces/user';

export interface VideoModel {
  id: string,
  name: string,
  slug?: string,
  description?: string,
  favorite?: boolean,
  following?: boolean,
  'created_at': string,
  'updated_at': string,
  'capture_time': number,
  'dash_url'?: string
  'episode_number': string,
  'poster_url'?: string
  'release_date': string,
  'season_number': string,
  'sprite_url'?: string
  clips?: MediaModel[],
  duration: number,
  model?: UserModel,
  overview?: string,
  resolution: string,
  status?: string,
  tags?: TagModel[],
  type?: string,
  views?: number,
}

export interface VideosReponse extends RepositoryResponse {
  data: VideoModel[],
}

export interface VideosState {
  id: string | number | null,
  data: VideoModel[],
  query: RepositoryQuery,
  meta: RepositoryMeta,
  links: RepositoryLinks,
}

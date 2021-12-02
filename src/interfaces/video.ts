import { MediaModel, Model, ModelResponse, RepositoryParams, RepositoryResponse, TagModel } from 'src/interfaces';

export interface VideoModel extends Model {
  'capture_time': number,
  'dash_url'?: string
  'episode_number': string,
  'poster_url'?: string
  'release_date': string,
  'season_number': string,
  'sprite_url'?: string
  duration: number,
  quality: string,
  clips?: MediaModel[],
  model?: Model,
  overview?: string,
  status?: string,
  tags?: TagModel[],
  type?: string,
  views?: number,
}

export interface VideosParams extends RepositoryParams {
  type: string | string[] | null,
  tags: string | string[] | null,
}

export interface VideosState extends RepositoryResponse {
  id: string | number,
  params: VideosParams,
}

export interface VideoState extends ModelResponse {
  data: VideoModel,
}

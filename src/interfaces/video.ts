import { MediaModel, Model, ModelResponse, RepositoryQuery, RepositoryResponse, TagModel } from 'src/interfaces';

export interface VideoModel extends Model {
  'capture_time': number,
  'dash_url'?: string
  'episode_number': string,
  'poster_url'?: string
  'release_date': string,
  'season_number': string,
  'sprite_url'?: string
  clips?: MediaModel[],
  duration: number,
  model?: Model,
  overview?: string,
  resolution: string,
  status?: string,
  tags?: TagModel[],
  type?: string,
  views?: number,
}

export interface VideosState extends RepositoryResponse {
  id: string | number | null,
  query: RepositoryQuery,
}

export interface VideoState extends ModelResponse {
  data: VideoModel,
}

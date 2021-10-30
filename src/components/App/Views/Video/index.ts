import { MediaModel } from 'components/App/Views/Media/index';
import { TagModel } from 'components/App/Views/Tag/index';
import { UserModel } from 'components/UIComponents/Users';

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

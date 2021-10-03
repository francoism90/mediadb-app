import { Model } from 'src/interfaces/repository';

export interface UserPreferences {
  autoplay: boolean,
  muteVideos: boolean,
}

export interface UserSettings {
  [key: string]: string | number | null
}

export interface UserModel extends Model {
  'avatar_url'?: string | null,
  email?: string,
  permissions?: string[],
  roles?: string[],
  settings?: UserSettings[],
}

export interface UserResponse {
  data: UserModel,
  meta: null
}

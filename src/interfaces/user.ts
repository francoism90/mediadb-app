import { Model } from 'src/interfaces/repository';

export interface UserSettings {
  [key: string]: string | number | null
}

export interface UserModel extends Model {
  email: string,
  roles: string[],
  permissions: string[],
  settings: UserSettings[],
  'avatar_url'?: string | null,
}

export interface UserResponse {
  data: UserModel,
  meta: null
}

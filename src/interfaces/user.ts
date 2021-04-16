import { Model } from './repository'
export interface UserSettings {
  [key: string]: string | number | null
}

export interface User extends Model {
  'avatar_url'?: string | null
  'roles'?: string[]
  'permissions'?: string[]
  'settings'?: UserSettings[]
}

export interface UserResponse {
  data: User,
  meta: null
}

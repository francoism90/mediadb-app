import { Model } from './repository'

export interface User extends Model {
  'avatar_url'?: string | null
  'roles'?: string | null
  'settings'?: string | null
}

export interface UserResponse {
  data: User,
  meta: null
}

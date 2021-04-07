export interface BaseModel {
  id: string | number,
  uuid?: string | number | null,
  slug?: string | number | null,
  name?: string | number | null,
  description?: string | null,
  'created_at'?: Date | null,
  'updated_at'?: Date | null,
}

export interface UserModel extends BaseModel {
  'avatar_url'?: string | null
  'roles'?: string | null
  'settings'?: string | null
}

export interface VideoModel extends BaseModel {
  type?: string | null,
  views?: number | null,
  'release_date'?: Date | null,
  'season_number'?: number | null,
  'episode_number'?: number | null,
}

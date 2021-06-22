export interface UserSettings {
  [key: string]: string | number | null
}

export interface UserModel {
  id: string,
  email: string,
  roles: string[],
  permissions: string[],
  settings: UserSettings[],
  'avatar_url'?: string | null,
}

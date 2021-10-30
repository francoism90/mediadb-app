export interface UserSettings {
  autoplay: boolean,
  muteVideos: boolean,
}

export interface UserModel {
  id: string,
  name: string,
  email?: string,
  permissions?: string[],
  roles?: string[],
  settings?: UserSettings,
  'created_at': string,
  'avatar_url'?: string,
}

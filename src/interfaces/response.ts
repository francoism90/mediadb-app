import { FieldError } from './form'
import { UserModel, VideoModel } from './model'

export interface AuthResponse {
  token?: string
}

export interface UserResponse {
  data?: UserModel,
  meta?: null
}

export interface VideoResponse {
  data?: VideoModel,
  meta?: null
}

export interface VideosResponse {
  data?: {
    [index: number]: VideoModel[],
  },
  meta?: null
}

export interface ValidationResponse {
  errors?: {
    [key: string]: FieldError[]
  },
  message?: string
}

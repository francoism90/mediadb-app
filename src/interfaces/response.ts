import { FieldError } from './form'
import { User } from './user'

export interface AuthResponse {
  token?: string
}

export interface UserResponse {
  data?: User,
  meta?: null
}

export interface ValidationResponse {
  errors?: {
    [key: string]: FieldError[]
  },
  message?: string
}

import { FieldError } from './form'
import { User } from './user'

export interface AuthResponse {
  token?: string
  user?: User,
}

export interface UserResponse {
  token?: string
  user?: User,
}

export interface ValidationResponse {
  errors?: {
    [key: string]: FieldError[]
  },
  message?: string
}

import { FieldError } from './form'
import { User } from './user'

export interface UserResponse {
  user?: User,
  token?: string
}

export interface ValidationResponse {
  errors?: {
    [key: string]: FieldError[]
  },
  message?: string
}

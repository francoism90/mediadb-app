import { User } from 'src/interfaces/user'

export interface CsrfCookie {
  message?: string
}

export interface LoginUser {
  email: string,
  password: string,
  'device_name': string,
  'remember_me': boolean
}

export interface LogoutUser {
  token: string
}

export interface AuthResponse {
  token?: string
  user?: User
  success?: boolean
}

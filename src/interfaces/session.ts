import { User } from 'src/interfaces/user';

export interface CsrfCookie {
  message?: string
}

export interface AuthUser {
  token: string | null
}

export interface LoginUser {
  email: string,
  password: string,
  'device_name': string,
  'remember_me': boolean
}

export interface AuthResponse {
  token?: string
  user?: User,
  success?: boolean
}

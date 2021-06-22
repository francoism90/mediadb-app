import { UserModel } from 'src/interfaces/user';

export interface CsrfCookie {
  message: string | null,
}

export interface AuthUser {
  token: string | null,
}

export interface LoginUser {
  email: string,
  password: string,
  'device_name': string,
  'remember_me': boolean,
}

export interface AuthResponse {
  token: string | null,
  user: UserModel | null,
  success: boolean,
}

export interface SessionState {
  redirectPath: string | null,
  timestamp: Date | null,
  token: string | null,
  user: UserModel,
}

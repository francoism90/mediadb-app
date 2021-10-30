import { UserModel } from 'src/interfaces/user';

export interface SessionState {
  redirectUri: string,
  timestamp: number,
  token: string,
  user: UserModel | undefined,
}

export interface AuthRequest {
  redirectUri?: string,
  token?: string,
}

export interface AuthResponse {
  token: string,
  user: UserModel,
}

export interface LoginForm {
  'device_name': string,
  email: string,
  password: string,
  remember: boolean,
}

export interface LoginResponse extends AuthRequest {
  token: string,
  user: UserModel,
}

export interface LogoutForm {
  token: string,
}

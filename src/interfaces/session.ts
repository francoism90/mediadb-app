import { UserModel } from 'src/interfaces';

export interface AuthResponse {
  token: string,
  user: UserModel,
}

export interface SessionState {
  error: unknown,
  timestamp: number,
  token: string,
  user: UserModel,
}

export interface LoginRequest {
  'device_name': string,
  email: string,
  password: string,
  remember: boolean,
}

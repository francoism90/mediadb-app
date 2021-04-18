export interface CsrfCookie {
  message?: string
}

export interface LoginUser {
  email: string,
  password: string,
  deviceName: string,
  remember: boolean
}

export interface AuthResponse {
  token?: string
}

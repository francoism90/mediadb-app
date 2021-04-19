import { AxiosResponse } from 'axios'
import { api } from 'boot/axios'
import { AuthResponse, LoginUser, LogoutUser } from 'src/interfaces/session'
import { UserResponse } from 'src/interfaces/user'

export async function authUser (): Promise<UserResponse> {
  const response = await api.get<UserResponse, AxiosResponse<UserResponse>>('auth/user')

  return response.data
}

export async function loginUser (params: LoginUser): Promise<AuthResponse> {
  const response = await api.post<AuthResponse, AxiosResponse<AuthResponse>>('auth/login', params)

  return response.data
}

export async function logoutUser (params: LogoutUser): Promise<AuthResponse> {
  const response = await api.post<AuthResponse, AxiosResponse<AuthResponse>>('auth/logout', params)

  return response.data
}

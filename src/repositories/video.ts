import { api } from 'boot/axios'
import { AxiosResponse } from 'axios'
import { VideoResponse, VideosResponse } from 'src/interfaces/response'

export async function find (id: string | number): Promise<VideoResponse> {
  const response = await api.get<VideoResponse, AxiosResponse<VideoResponse>>(`video/${id}`)

  return response.data
}

export async function findAll (id: string | number): Promise<VideosResponse> {
  const response = await api.get<VideosResponse, AxiosResponse<VideosResponse>>(`video/${id}`)

  return response.data
}

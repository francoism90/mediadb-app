import { api } from 'boot/axios'
import { AxiosResponse } from 'axios'
import { VideoResponse } from 'src/interfaces/response'

export async function find (id: string | number): Promise<VideoResponse> {
  const response = await api.get<VideoResponse, AxiosResponse<VideoResponse>>(`video/${id}`)

  return response.data
}

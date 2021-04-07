import { api } from 'boot/axios'
import { AxiosResponse } from 'axios'
import { VideoResponse, VideosResponse } from 'src/interfaces/response'
import { VideosParameters } from 'src/interfaces/repository'

export async function find (id: string | number): Promise<VideoResponse> {
  const response = await api.get<VideoResponse, AxiosResponse<VideoResponse>>(
    `video/${id}`
  )

  return response.data
}

export async function findAll (params: VideosParameters): Promise<VideosResponse> {
  const response = await api.get<VideosResponse, AxiosResponse<VideosResponse>>(
    'videos', { params }
  )

  return response.data
}

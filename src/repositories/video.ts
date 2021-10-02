import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import {
  VideoModel, VideoResponse, VideosQuery, VideosResponse,
} from 'src/interfaces/video';

export async function find(id: string): Promise<VideoResponse> {
  const response = await api.get<string, AxiosResponse<VideoResponse>>(
    `videos/${id}`,
  );

  return response.data;
}

export async function all(params: VideosQuery): Promise<VideosResponse> {
  const response = await api.get<VideosQuery, AxiosResponse<VideosResponse>>(
    'videos', { params },
  );

  return response.data;
}

export async function save(params: VideoModel): Promise<VideoResponse> {
  const response = await api.patch<VideoModel, AxiosResponse<VideoResponse>>(
    `videos/${params.id}`, params,
  );

  return response.data;
}

export async function remove(params: VideoModel): Promise<VideoResponse> {
  const response = await api.delete<VideoModel, AxiosResponse<VideoResponse>>(
    `videos/${params.id}`,
  );

  return response.data;
}

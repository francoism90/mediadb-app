import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { VideoModel, VideoResponse, VideosQuery, VideosResponse } from 'src/interfaces/video';

export const find = async (id: string): Promise<VideoResponse> => {
  const response = await api.get<string, AxiosResponse<VideoResponse>>(
    `videos/${id}`,
  );

  return response.data;
};

export const all = async (params: VideosQuery): Promise<VideosResponse> => {
  const response = await api.get<VideosQuery, AxiosResponse<VideosResponse>>(
    'videos', { params },
  );

  return response.data;
};

export const get = async (url: string): Promise<VideosResponse> => {
  const response = await api.get<string, AxiosResponse<VideosResponse>>(url);

  return response.data;
};

export const save = async (params: VideoModel): Promise<VideoResponse> => {
  const response = await api.patch<VideoModel, AxiosResponse<VideoResponse>>(
    `videos/${params.id}`, params,
  );

  return response.data;
};

export const remove = async (params: VideoModel): Promise<VideoResponse> => {
  const response = await api.delete<VideoModel, AxiosResponse<VideoResponse>>(
    `videos/${params.id}`,
  );

  return response.data;
};

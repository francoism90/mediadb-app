import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { MediaModel, MediaResponse } from 'src/interfaces/media';

export async function save(params: MediaModel): Promise<MediaResponse> {
  const response = await api.patch<MediaModel, AxiosResponse<MediaResponse>>(
    `media/${params.id}`, params,
  );

  return response.data;
}

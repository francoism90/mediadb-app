import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { MediaModel, MediaResponse } from 'src/components/App/interfaces/media';

export const save = async (params: MediaModel): Promise<MediaResponse> => {
  const response = await api.patch<MediaModel, AxiosResponse<MediaResponse>>(
    `media/${params.id}`, params,
  );

  return response.data;
};

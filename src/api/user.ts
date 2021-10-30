import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { Model } from 'src/components/App/interfaces/repository';
import { AuthResponse, AuthUser, LoginUser } from 'src/components/App/interfaces/session';

export const logout = async (params: AuthUser): Promise<AuthResponse> => {
  const response = await api.post<AuthUser, AxiosResponse<AuthResponse>>('logout', params);

  return response.data;
};

export const favorite = async (params: Model, force?: boolean): Promise<Model> => {
  const response = await api.post<Model, AxiosResponse<Model>>(
    `user/favorite/${params.id}`, <Model>{
      favorite: force,
    },
  );

  return response.data;
};

export const follow = async (params: Model, force?: boolean): Promise<Model> => {
  const response = await api.post<Model, AxiosResponse<Model>>(
    `user/follow/${params.id}`, <Model>{
      following: force,
    },
  );

  return response.data;
};

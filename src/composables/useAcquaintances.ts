import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/interfaces/api';
import { Model } from 'src/interfaces/repository';
import { ModelResponse } from 'src/interfaces/repository';
import { favorite, follow } from 'src/repositories/user';

export default function useAcquaintances() {
  const toggleFavorite = async (model: Model, force?: boolean): Promise<ModelResponse> => {
    try {
      const response = await favorite(model, force);

      return response;
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;
      throw error;
    }
  };

  const toggleFollow = async (model: Model, force?: boolean): Promise<ModelResponse> => {
    try {
      const response = await follow(model, force);

      return response;
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;
      throw error;
    }
  };

  return {
    toggleFavorite,
    toggleFollow,
  };
}

import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/interfaces/api';
import { Model } from 'src/interfaces/repository';
import { favorite, follow } from 'src/repositories/user';

export default function useAcquaintances() {
  const toggleFavorite = async (model: Model, force?: boolean): Promise<void> => {
    try {
      await favorite(model, force);
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;
      throw error;
    }
  };

  const toggleFollow = async (model: Model, force?: boolean): Promise<void> => {
    try {
      await follow(model, force);
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

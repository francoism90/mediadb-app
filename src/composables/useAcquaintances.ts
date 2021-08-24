import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/interfaces/api';
import { Model } from 'src/interfaces/repository';
import { favorite, follow } from 'src/repositories/user';

export default function useAcquaintances() {
  const toggleFavorite = async (payload: Model): Promise<void> => {
    try {
      await favorite(payload);
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;
      throw error;
    }
  };

  const toggleFollow = async (payload: Model): Promise<void> => {
    try {
      await follow(payload);
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

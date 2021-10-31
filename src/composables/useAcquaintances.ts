import { Model } from 'src/interfaces';
import { favorite, follow } from 'src/services/api';

export const useAcquaintances = () => {
  const favorited = async (model: Model, force?: boolean): Promise<Model> => favorite(model, force);
  const following = async (model: Model, force?: boolean): Promise<Model> => follow(model, force);

  return {
    favorited,
    following,
  };
};

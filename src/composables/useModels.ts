import { find, findIndex, mergeWith, remove } from 'lodash';
import { useSimilar } from 'src/composables/useSimilar';
import { useVideos } from 'src/composables/useVideos';
import { mergeDeep } from 'src/helpers';
import { Model } from 'src/interfaces';

export const useModels = () => {
  const { state: videos } = useVideos();
  const { state: similar } = useSimilar();

  const states = [
    videos,
    similar,
  ];

  const deleted = (payload: Model) => {
    states.forEach((state) => {
      remove(state.data, { id: payload.id });
    });
  };

  const replaced = (payload: Model) => {
    states.forEach((state) => {
      const index = findIndex(state.data, { id: payload.id });

      if (index >= 0) {
        const model = find(state.data, { id: payload.id });
        const object = mergeWith(model, payload, mergeDeep);

        state.data.splice(index, 1, object);
      }
    });
  };

  return {
    deleted,
    replaced,
  };
};

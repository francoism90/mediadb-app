import { find, findIndex, mergeWith, remove } from 'lodash';
import { useEcho } from 'src/composables/useEcho';
import { useSession } from 'src/composables/useSession';
import { useSimilar } from 'src/composables/useSimilar';
import { useVideos } from 'src/composables/useVideos';
import { mergeDeep } from 'src/helpers';
import { Model } from 'src/interfaces';

export const useModels = () => {
  const { echo } = useEcho();
  const { state: session } = useSession();
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

  const unsubscribe = () => echo?.leave(`user.${session.user?.id}`);

  const subscribe = () => echo?.private(`user.${session.user?.id}`)
    ?.listen('.model.favorited', deleted)
    ?.listen('.model.followed', replaced);

  return {
    deleted,
    replaced,
    subscribe,
    unsubscribe,
    echo,
  };
};

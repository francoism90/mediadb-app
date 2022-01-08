import { useLoading } from 'src/composables/useLoading';
import { useSession } from 'src/composables/useSession';
import { useStores } from 'src/composables/useStores';
import { ResponseError, VideoModel } from 'src/interfaces';
import { find, remove, save } from 'src/services/api';
import { useStore } from 'src/store/videos/item';

export const useVideo = () => {
  const store = useStore();
  const { onDelete, onUpdate } = useStores();
  const { echo } = useSession();
  const { state, startLoading, stopLoading } = useLoading();

  const fetch = async (id: string) => find(`videos/${id}`);
  const destroy = async (id: string) => remove(`videos/${id}`);
  const update = async (id: string, payload: VideoModel) => save(`videos/${id}`, payload);
  const favorite = async (id: string, payload?: VideoModel) => save(`videos/favorite/${id}`, payload);
  const follow = async (id: string, payload?: VideoModel) => save(`videos/follow/${id}`, payload);

  const initialize = async (id: string) => {
    startLoading();

    try {
      const response = await fetch(id);
      store.populate(response);
    } catch (e: unknown) {
      const error = e as ResponseError;

      // Reset video store
      store.$reset();

      if (error.response) {
        stopLoading(error.response.data);
        return;
      }

      throw error;
    } finally {
      stopLoading();
    }
  };

  const unsubscribe = (id: string) => echo?.leave(`video.${id}`);
  const subscribe = (id: string) => echo?.private(`video.${id}`)
    ?.listen('.video.deleted', onDelete)
    ?.listen('.video.updated', onUpdate);

  return {
    state,
    store,
    initialize,
    fetch,
    destroy,
    update,
    favorite,
    follow,
    subscribe,
    unsubscribe,
  };
};

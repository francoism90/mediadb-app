import { useLoading } from 'src/composables/useLoading';
import { useSession } from 'src/composables/useSession';
import { ResponseError, VideoModel } from 'src/interfaces';
import { find, remove, save } from 'src/services/api';
import { deleted, updated } from 'src/services/store';
import { useStore } from 'src/store/videos/item';

export const useVideo = () => {
  const store = useStore();
  const { echo } = useSession();
  const { state, isReady, resetResponse, setResponse } = useLoading();

  const fetch = async (id: string) => find(`videos/${id}`);
  const destroy = async (id: string) => remove(`videos/${id}`);
  const update = async (id: string, payload: VideoModel) => save(`videos/${id}`, payload);
  const favorite = async (id: string, payload?: VideoModel) => save(`videos/favorite/${id}`, payload);
  const follow = async (id: string, payload?: VideoModel) => save(`videos/follow/${id}`, payload);

  const initialize = async (id: string) => {
    resetResponse();

    try {
      const response = await fetch(id);

      store.populate(response);
    } catch (e: unknown) {
      const error = e as ResponseError;

      // Reset video store
      store.$reset();

      if (error.response) {
        setResponse(error.response.data);
        return;
      }

      throw error;
    } finally {
      isReady();
    }
  };

  const unsubscribe = (id: string) => echo?.leave(`video.${id}`);
  const subscribe = (id: string) => echo?.private(`video.${id}`)
    ?.listen('.video.deleted', deleted)
    ?.listen('.video.updated', updated);

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

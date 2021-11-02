import { useLoading } from 'src/composables/useLoading';
import { useSession } from 'src/composables/useSession';
import { useStores } from 'src/composables/useStores';
import { ResponseError, VideoModel } from 'src/interfaces';
import { find, remove, save } from 'src/services/api';
import { useStore } from 'src/store/videos/item';

export const useVideo = () => {
  const store = useStore();
  const { echo } = useSession();
  const { deleted, updated } = useStores();
  const { state, isReady, resetResponse, setResponse } = useLoading();

  const fetch = async (id: string) => find(`videos/${id}`);
  const destroy = async (id: string) => remove(`videos/${id}`);
  const update = async (id: string, payload: VideoModel) => save(`videos/${id}`, payload);

  const initialize = async (id: string) => {
    resetResponse();

    try {
      const response = await fetch(id);

      store.populate(response);
    } catch (e: unknown) {
      const error = e as ResponseError;

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
    subscribe,
    unsubscribe,
  };
};

import { AxiosError } from 'axios';
import { useSession } from 'src/composables/useSession';
import { useStores } from 'src/composables/useStores';
import { useValidation } from 'src/composables/useValidation';
import { ValidationResponse, VideoModel } from 'src/interfaces';
import { find, remove, save } from 'src/services/api';
import { useStore } from 'src/store/videos/item';
import { computed } from 'vue';

export const useVideo = () => {
  const store = useStore();
  const { echo } = useSession();
  const { resetResponse, setResponse, getMessage } = useValidation();
  const { deleted, updated } = useStores();

  const message = computed(() => getMessage());

  const initialize = async (id: string): Promise<void> => {
    resetResponse();

    try {
      const response = await find(`videos/${id}`);

      store.populate(response);
    } catch (e: unknown) {
      const error = e as AxiosError<ValidationResponse, unknown>;

      if (error.response) {
        setResponse(error.response.data);
        return;
      }

      throw error;
    }
  };

  const destroy = async (id: string) => remove(`videos/${id}`);
  const update = async (id: string, payload: VideoModel) => save(`videos/${id}`, payload);

  const unsubscribe = (id: string): void => echo?.leave(`video.${id}`);
  const subscribe = (id: string): void => {
    echo?.private(`video.${id}`)
      .listen('.video.deleted', deleted)
      .listen('.video.updated', updated);
  };

  return {
    store,
    message,
    initialize,
    destroy,
    update,
    subscribe,
    unsubscribe,
  };
};

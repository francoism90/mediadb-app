import { AxiosError } from 'axios';
import useEcho from 'src/composables/useEcho';
import { ErrorResponse } from 'src/interfaces/api';
import { VideoModel } from 'src/interfaces/video';
import { find } from 'src/repositories/video';
import { useStore } from 'src/store/videos/item';
import { ref } from 'vue';

export default function useVideo() {
  const { echo } = useEcho();
  const store = useStore();

  const errors = ref<ErrorResponse>();

  const initialize = async (id: string): Promise<void> => {
    try {
      const response = await find(id);
      store.populate(response);
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;

      if (error.response) {
        errors.value = error.response.data;
        return;
      }

      throw error;
    }
  };

  const deleted = async (id: string): Promise<void> => {
    store.delete(<VideoModel>{ id });
    await initialize(id);
  };

  const subscribe = (id: string): void => {
    echo?.private(`video.${id}`)
      .listen('.video.deleted', () => deleted(id))
      .listen('.video.updated', () => initialize(id));
  };

  const unsubscribe = (id: string): void => {
    echo?.leave(`video.${id}`);
  };

  return {
    initialize,
    subscribe,
    unsubscribe,
    store,
    errors,
  };
}

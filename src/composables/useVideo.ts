import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/interfaces/api';
import { find } from 'src/repositories/video';
import { ref } from 'vue';
import { useStore } from 'src/store/videos/item';
import useEcho from 'src/composables/useEcho';

export default function useVideo() {
  const { echo } = useEcho();
  const store = useStore();

  const errors = ref<ErrorResponse>();

  const initialize = async (id: string): Promise<void> => {
    store.$reset();

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

  const subscribe = (id: string): void => {
    echo?.private(`video.${id}`)
      .listen('.video.deleted', () => initialize(id))
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

import { AxiosError } from 'axios';
import useEcho from 'src/composables/useEcho';
import useSimilar from 'src/composables/useSimilar';
import useVideos from 'src/composables/useVideos';
import { ErrorResponse } from 'src/interfaces/api';
import { VideoModel } from 'src/interfaces/video';
import { find } from 'src/repositories/video';
import { useStore } from 'src/store/video/item';
import { ref } from 'vue';

export default function useVideo() {
  const { echo } = useEcho();
  const { store: similar } = useSimilar();
  const { store: videos } = useVideos();
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

  const deleted = (payload: VideoModel): void => {
    store.delete(payload);
    similar.delete(payload);
    videos.delete(payload);
  };

  const updated = (payload: VideoModel): void => {
    store.update(payload);
    similar.update(payload);
    videos.update(payload);
  };

  const subscribe = (id: string): void => {
    echo?.private(`video.${id}`)
      .listen('.video.deleted', deleted)
      .listen('.video.updated', updated);
  };

  const unsubscribe = (id: string): void => echo?.leave(`video.${id}`);

  return {
    initialize,
    deleted,
    updated,
    subscribe,
    unsubscribe,
    store,
    errors,
  };
}

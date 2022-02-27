import { api } from 'src/boot/fetch';
import { useSession } from 'src/composables/useSession';
import { useStores } from 'src/composables/useStores';
import { VideoResponse, VideoState } from 'src/interfaces';
import { reactive } from 'vue';

const state = reactive(<VideoState>{});

export const useVideo = () => {
  const { onDelete, onUpdate } = useStores();
  const { echo } = useSession();

  const initialize = async (id: string) => {
    const { isFetching, error, data } = await api(`videos/${id}`).json<VideoResponse>();

    state.data = data.value?.data;
    state.meta = data.value?.meta;
    state.fetching = isFetching.value;
    state.error = error;
  };

  const unsubscribe = (id: string) => echo?.leave(`video.${id}`);
  const subscribe = (id: string) => echo?.private(`video.${id}`)
    ?.listen('.video.deleted', onDelete)
    ?.listen('.video.updated', onUpdate);

  return {
    initialize,
    subscribe,
    unsubscribe,
    state,
  };
};

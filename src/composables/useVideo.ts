import { api } from 'src/boot/fetch';
import { useSession } from 'src/composables/useSession';
import { useStores } from 'src/composables/useStores';
import { VideoModel, VideoResponse, VideoState } from 'src/interfaces';
import { reactive } from 'vue';

const state = reactive(<VideoState>{});

export const useVideo = () => {
  const { onDelete, onUpdate } = useStores();
  const { echo } = useSession();

  const update = (payload: VideoResponse | null) => {
    if (typeof payload?.data?.id === 'string') {
      state.data = { ...state.data, ...payload?.data };
      state.meta = { ...state.meta, ...payload?.meta };
    }
  };

  const initialize = async (id: string) => {
    const { error, data } = await api(`videos/${id}`).get().json<VideoResponse>();

    // On error
    state.error = error || null;

    // Update objects
    update(data.value);
  };

  const save = async (id: string, payload: VideoModel) => {
    const { error, data } = await api(`videos/${id}`).post(payload).json<VideoResponse>();

    // On error
    state.error = error || null;

    // Update objects
    update(data.value);
  };

  const unsubscribe = (id: string) => echo?.leave(`video.${id}`);
  const subscribe = (id: string) => echo?.private(`video.${id}`)
    ?.listen('.video.deleted', onDelete)
    ?.listen('.video.updated', onUpdate);

  return {
    initialize,
    save,
    subscribe,
    unsubscribe,
    state,
  };
};

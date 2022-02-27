// import { useSession } from 'src/composables/useSession';
import { VideoModel, VideoResponse, VideoState } from 'src/interfaces';
import { api } from 'src/services/api';
import { reactive, readonly } from 'vue';

const state = reactive(<VideoState>{});

export const useVideo = () => {
  // const { onDelete, onUpdate } = useStores();
  // const { echo } = useSession();

  const update = (payload: VideoResponse | null) => {
    if (typeof payload?.data?.id === 'string') {
      state.data = { ...state.data, ...payload?.data };
      state.meta = { ...state.meta, ...payload?.meta };
    }
  };

  const fetch = async (id: string) => {
    const { error, data } = await api(`videos/${id}`).get().json<VideoResponse>();

    // On error
    state.error = error || null;

    // Update objects
    update(data.value);
  };

  const save = async (id: string, payload: VideoModel) => {
    // Merge with current data (if any)
    const obj = { ...state.data, ...payload };

    const { error, data } = await api(`videos/${id}`).post(obj).json<VideoResponse>();

    // On error
    state.error = error || null;

    // Update objects
    update(data.value);
  };

  const destroy = async (id: string) => {
    const { error, data } = await api(`videos/${id}`).delete().json<VideoResponse>();

    // On error
    state.error = error || null;

    // Update objects
    update(data.value);
  };

  const favorite = async (id: string) => {
    const { error, data } = await api(`videos/favorite/${id}`).post().json<VideoResponse>();

    // On error
    state.error = error || null;

    // Update objects
    update(data.value);
  };

  const follow = async (id: string) => {
    const { error, data } = await api(`videos/follow/${id}`).post().json<VideoResponse>();

    // On error
    state.error = error || null;

    // Update objects
    update(data.value);
  };

  // const unsubscribe = (id: string) => echo?.leave(`video.${id}`);
  // const subscribe = (id: string) => echo?.private(`video.${id}`)
  //   ?.listen('.video.deleted', onDelete)
  //   ?.listen('.video.updated', onUpdate);

  return {
    fetch,
    save,
    destroy,
    favorite,
    follow,
    // subscribe,
    // unsubscribe,
    state: readonly(state),
  };
};

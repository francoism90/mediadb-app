import { useQuasar } from 'quasar';
import { useModels } from 'src/composables/useModels';
import { Model, VideoModel, VideoResponse, VideoState } from 'src/interfaces';
import { api } from 'src/services/api';
import { reactive } from 'vue';

const state = reactive(<VideoState>{});

export const useVideo = () => {
  const $q = useQuasar();
  const { deleted, replaced, echo } = useModels();

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

  const save = (id: string, payload: VideoModel) => {
    // Merge with current data (if any)
    const obj = { ...state.data, ...payload };

    return api(`videos/${id}`).post(obj).json<VideoResponse>();
  };

  const remove = (id: string) => api(`videos/${id}`).delete().json<VideoResponse>();

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

    // Update object
    update(data.value);
  };

  const onDeleted = (payload: VideoResponse) => {
    $q.notify({
      type: 'positive',
      message: 'An delete has just been made.',
      caption: state.data?.name || state.data?.id || '',
      classes: 'no-shadow',
    });

    // Update object
    update(payload);

    // Delete in states
    deleted(<Model>payload.data);
  };

  const onUpdated = (payload: VideoResponse) => {
    $q.notify({
      type: 'positive',
      message: 'An update has just been made.',
      caption: state.data?.name || state.data?.id || '',
      classes: 'no-shadow',
    });

    // Update object
    update(payload);

    // Replace in states
    replaced(<Model>payload.data);
  };

  const unsubscribe = (id: string) => echo?.leave(`video.${id}`);

  const subscribe = (id: string) => echo?.private(`video.${id}`)
    ?.listen('.video.deleted', onDeleted)
    ?.listen('.video.updated', onUpdated);

  return {
    fetch,
    save,
    remove,
    favorite,
    follow,
    subscribe,
    unsubscribe,
    state,
  };
};

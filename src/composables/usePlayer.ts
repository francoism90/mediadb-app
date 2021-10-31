import { useQuasar } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { useVideo } from 'src/composables/useVideo';
import { timeFormat } from 'src/helpers';
import { useStore } from 'src/store/videos/player';
import { computed } from 'vue';

export const usePlayer = () => {
  const $q = useQuasar();
  const store = useStore();
  const { store: sessionStore } = useSession();
  const { update: updateVideo, store: videoStore } = useVideo();

  const id = computed(() => videoStore.data?.id || '');
  const source = computed(() => videoStore.data?.dash_url || '');
  const token = computed(() => sessionStore.token || '');

  const currentTime = computed(() => timeFormat(store.properties?.time));
  const duration = computed(() => timeFormat(store.properties?.duration));

  const capture = async (): Promise<void> => {
    await updateVideo(id.value, { ...videoStore.data, ...{ capture_time: store.properties?.time || 0 } });

    $q.notify({ type: 'positive', message: 'The video thumbnail will be updated' });
  };

  return {
    store,
    currentTime,
    duration,
    source,
    token,
    capture,
  };
};

import { useQuasar } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { useVideo } from 'src/composables/useVideo';
import { timeFormat } from 'src/helpers';
import { VideoModel } from 'src/interfaces';
import { getThumbnail, store } from 'src/services/player';
import { computed } from 'vue';

export const usePlayer = () => {
  const $q = useQuasar();
  const { store: sessionStore } = useSession();
  const { update, store: videoStore } = useVideo();

  const source = computed(() => videoStore.data?.dash_url || '');
  const token = computed(() => sessionStore.token || '');

  const currentTime = computed(() => timeFormat(store.properties?.time));
  const duration = computed(() => timeFormat(store.properties?.duration));

  const capture = async () => {
    await update(videoStore.id || '', <VideoModel>{
      name: videoStore.name,
      thumbnail: store.properties?.time,
    });

    $q.notify({ type: 'positive', message: 'The video thumbnail will be updated.' });
  };

  return {
    store,
    currentTime,
    duration,
    source,
    token,
    getThumbnail,
    capture,
  };
};

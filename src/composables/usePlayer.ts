import { useSession } from 'src/composables/useSession';
import { useVideo } from 'src/composables/useVideo';
import { useStore } from 'src/store/video/player';
import { computed } from 'vue';

export const usePlayer = () => {
  const store = useStore();
  const { store: sessionStore } = useSession();
  const { store: videoStore } = useVideo();

  const source = computed(() => videoStore.data?.dash_url || '');
  const token = computed(() => sessionStore.token || '');

  return {
    store,
    source,
    token,
  };
};

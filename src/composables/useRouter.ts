import { router } from 'src/router';
import { computed } from 'vue';

export default function useRouter() {
  const currentRoute = computed(() => router.currentRoute.value);

  return {
    router,
    currentRoute,
  };
}

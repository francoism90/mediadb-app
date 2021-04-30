import { router } from 'src/router';
import { computed } from 'vue';

export default function useRouter() {
  const currentRoute = computed(() => router.currentRoute.value);
  const currentRouteName = computed(() => currentRoute.value.name?.toString());

  return {
    router,
    currentRoute,
    currentRouteName,
  };
}

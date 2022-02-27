import { includes } from 'lodash';
import { echoKey } from 'src/boot/echo';
import { SessionState } from 'src/interfaces';
import { authenticate, destroy, fetch } from 'src/services/auth';
import { computed, inject, reactive, readonly } from 'vue';

const state = reactive(<SessionState>{});

export const useSession = () => {
  const echo = inject(echoKey);

  const roles = computed(() => state.user?.roles || []);
  const permissions = computed(() => state.user?.permissions || []);

  const hasRole = (key: string | string[]) => includes(roles.value, key);
  const hasPermission = (key: string | string[]) => includes(permissions.value, key);

  // const unsubscribe = () => echo?.leave(`user.${state.user?.id}`);
  // const subscribe = () => echo?.private(`user.${state.user?.id}`)
  //   ?.listen('.model.favorited', updated)
  //   ?.listen('.model.followed', updated);

  return {
    state: readonly(state),
    roles: readonly(roles),
    permissions: readonly(permissions),
    echo,
    authenticate,
    fetch,
    destroy,
    // subscribe,
    // unsubscribe,
    hasRole,
    hasPermission,
  };
};

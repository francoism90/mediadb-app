import { includes } from 'lodash';
import { echoKey } from 'src/boot/echo';
import { AuthRequest, LoginRequest } from 'src/interfaces';
import { authenticate, check, destroy, store } from 'src/services/auth';
import { updated } from 'src/services/store';
import { computed, inject, readonly } from 'vue';

export const useSession = () => {
  const echo = inject(echoKey);

  const roles = computed(() => store.user?.roles || []);
  const permissions = computed(() => store.user?.permissions || []);
  const token = computed(() => store.token || '');

  const hasRole = (key: string | string[]) => includes(roles.value, key);
  const hasPermission = (key: string | string[]) => includes(permissions.value, key);

  const signIn = async (data: LoginRequest) => authenticate(data, true);
  const signOut = async (data: AuthRequest) => destroy(data, true);
  const isValid = async (data?: AuthRequest) => check(data);

  const unsubscribe = () => echo?.leave(`user.${store.user?.id}`);
  const subscribe = () => echo?.private(`user.${store.user?.id}`)
    ?.listen('.model.favorited', updated)
    ?.listen('.model.followed', updated);

  return {
    roles: readonly(roles),
    permissions: readonly(permissions),
    token: readonly(token),
    echo,
    store,
    signIn,
    signOut,
    subscribe,
    unsubscribe,
    isValid,
    hasRole,
    hasPermission,
  };
};

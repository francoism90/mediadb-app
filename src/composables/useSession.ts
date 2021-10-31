import { includes } from 'lodash';
import { echoKey } from 'src/boot/echo';
import { useStores } from 'src/composables/useStores';
import { AuthRequest, AuthResponse, LoginRequest } from 'src/interfaces';
import { authenticate, check, destroy } from 'src/services/auth';
import { useStore } from 'src/store';
import { inject } from 'vue';

export const useSession = () => {
  const store = useStore();
  const echo = inject(echoKey);
  const { deleted, updated } = useStores();

  const roles = store.user?.roles || [];
  const permissions = store.user?.permissions || [];

  const hasRole = (key: string | string[]): boolean => includes(roles, key);
  const hasPermission = (key: string | string[]): boolean => includes(permissions, key);

  const signIn = async (data: LoginRequest): Promise<AuthResponse> => authenticate(data, true);
  const signOut = async (data: AuthRequest): Promise<AuthResponse> => destroy(data, true);
  const isValid = async (data?: AuthRequest): Promise<boolean> => check(data);

  const subscribe = (): void => {
    echo?.private(`user.${store.user?.id}`)
      .listen('.model.deleted', deleted)
      .listen('.model.updated', updated);
  };

  const unsubscribe = (): void => echo?.leave(`user.${store.user?.id}`);

  return {
    signIn,
    signOut,
    subscribe,
    unsubscribe,
    isValid,
    hasRole,
    hasPermission,
    echo,
    store,
    roles,
    permissions,
  };
};

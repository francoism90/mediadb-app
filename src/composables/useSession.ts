import { includes } from 'lodash';
import { echoKey } from 'src/boot/echo';
import { useModels } from 'src/composables/useModels';
import { AuthResponse, SessionState } from 'src/interfaces';
import { api } from 'src/services/api';
import { authenticate, destroy } from 'src/services/auth';
import { computed, inject, reactive, readonly } from 'vue';

const state = reactive(<SessionState>{});

export const useSession = () => {
  const echo = inject(echoKey);
  const { deleted, replaced } = useModels();

  const roles = computed(() => state.user?.roles || []);
  const permissions = computed(() => state.user?.permissions || []);

  const update = (payload: SessionState) => Object.assign(state, payload);

  const check = async () => {
    const { error, data } = await api('user').get().json<AuthResponse>();

    if (!error.value && data.value) {
      update(<SessionState>data.value);
    }

    return {
      error,
      data,
    };
  };

  const hasRole = (key: string | string[]) => includes(roles.value, key);
  const hasPermission = (key: string | string[]) => includes(permissions.value, key);

  const unsubscribe = () => echo?.leave(`user.${state.user?.id}`);

  const subscribe = () => echo?.private(`user.${state.user?.id}`)
    ?.listen('.model.favorited', deleted)
    ?.listen('.model.followed', replaced);

  return {
    update,
    authenticate,
    check,
    destroy,
    subscribe,
    unsubscribe,
    hasRole,
    hasPermission,
    state: readonly(state),
    roles: readonly(roles),
    permissions: readonly(permissions),
    echo,
  };
};

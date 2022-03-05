import { includes } from 'lodash';
import { AuthResponse, SessionState } from 'src/interfaces';
import { api } from 'src/services/api';
import { authenticate, destroy } from 'src/services/auth';
import { computed, reactive, readonly } from 'vue';

const state = reactive(<SessionState>{});

export const useSession = () => {
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

  return {
    update,
    authenticate,
    check,
    destroy,
    hasRole,
    hasPermission,
    state: readonly(state),
    roles: readonly(roles),
    permissions: readonly(permissions),
  };
};

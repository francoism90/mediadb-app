import { some } from 'lodash';
import { SessionState } from 'src/interfaces/store';
import {
  useNamespacedActions, useNamespacedGetters, useNamespacedState,
} from 'vuex-composition-helpers';

export default function useSession() {
  const { resetStore, resetUser, initialize } = useNamespacedActions('session', [
    'resetStore', 'resetUser', 'initialize',
  ]);

  const { isAuthenticated } = useNamespacedGetters('session', ['isAuthenticated']);

  const {
    redirectPath, token, user,
  } = useNamespacedState<SessionState>('session', [
    'redirectPath', 'token', 'user',
  ]);

  const hasRole = (payload: string): boolean | undefined => {
    if (!isAuthenticated || !user.value.roles) {
      return false;
    }

    return user.value.roles.includes(payload);
  };

  const hasAnyRole = (payload: string): boolean => {
    if (!isAuthenticated || !user.value.roles) {
      return false;
    }

    const roles = payload.split(',');

    return some(user.value.roles, roles);
  };

  const hasPermission = (payload: string): boolean | undefined => {
    if (!isAuthenticated || !user.value.permissions) {
      return false;
    }

    return user.value.permissions.includes(payload);
  };

  const hasAnyPermissions = (payload: string): boolean | undefined => {
    if (!isAuthenticated || !user.value.permissions) {
      return false;
    }

    const permissions = payload.split(',');

    return some(user.value.roles, permissions);
  };

  return {
    resetStore,
    resetUser,
    initialize,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermissions,
    redirectPath,
    token,
    user,
  };
}

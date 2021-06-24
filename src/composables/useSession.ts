import { some } from 'lodash';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

export default function useSession() {
  const {
    useState, useActions, useGetters,
  } = createNamespacedHelpers('session');

  const { redirectPath, token, user } = useState([
    'redirectPath',
    'token',
    'user',
  ]);

  const { isAuthenticated } = useGetters([
    'isAuthenticated',
  ]);

  const { initialize, reset, resetUser } = useActions([
    'initialize',
    'reset',
    'resetUser',
  ]);

  const roles = user.value.roles as string[];

  const hasRole = (payload: string): boolean | undefined => {
    if (!isAuthenticated || !roles) {
      return false;
    }

    return roles.includes(payload);
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
    reset,
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

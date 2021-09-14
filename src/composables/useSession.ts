import { includes } from 'lodash';
import { useStore } from 'src/store/session';

export default function useSession() {
  const store = useStore();

  const roles = store.user?.roles || [];
  const permissions = store.user?.permissions || [];

  const hasRole = (key: string | string[]): boolean => includes(roles, key);
  const hasPermission = (key: string | string[]): boolean => includes(permissions, key);

  return {
    store,
    roles,
    permissions,
    hasRole,
    hasPermission,
  };
}

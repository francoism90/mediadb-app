import { includes } from 'lodash';
import { useSessionStore } from 'src/store/session';

export default function useSession() {
  const store = useSessionStore();

  const roles = store.user?.roles || [];
  const permissions = store.user?.permissions || [];

  const hasRole = (key: string | string[]): boolean | undefined => includes(roles, key);
  const hasPermission = (key: string | string[]): boolean | undefined => includes(permissions, key);

  return {
    hasRole,
    hasPermission,
  };
}

import { includes } from 'lodash';
import { useQuasar } from 'quasar';
import { setCsrfCookie } from 'src/services/api';
import { useStore } from 'src/store/session';

export default function useSession() {
  const $q = useQuasar();
  const store = useStore();

  const roles = store.user?.roles || [];
  const permissions = store.user?.permissions || [];

  const hasRole = (key: string | string[]): boolean => includes(roles, key);
  const hasPermission = (key: string | string[]): boolean => includes(permissions, key);

  const useCsrfCookie = async (): Promise<void> => {
    // CSRF is only useful on SPA/PWA
    if (!$q.platform.is.capacitor && !$q.platform.is.cordova) {
      await setCsrfCookie();
    }
  };

  return {
    store,
    roles,
    permissions,
    hasRole,
    hasPermission,
    useCsrfCookie,
  };
}

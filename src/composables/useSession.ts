import { includes } from 'lodash';
import useEcho from 'src/composables/useEcho';
import useStore from 'src/composables/useStore';
import { useStore as useSessionStore } from 'src/store/session';

export default function useSession() {
  const store = useSessionStore();
  const { echo } = useEcho();
  const { updated } = useStore();

  const roles = store.user?.roles || [];
  const permissions = store.user?.permissions || [];

  const hasRole = (key: string | string[]): boolean => includes(roles, key);
  const hasPermission = (key: string | string[]): boolean => includes(permissions, key);

  const subscribe = (): void => {
    echo?.private(`user.${store.user?.id}`)
      .listen('.model.favorited', updated)
      .listen('.model.followed', updated);
  };

  const unsubscribe = (): void => echo?.leave(`user.${store.user?.id}`);

  return {
    subscribe,
    unsubscribe,
    hasRole,
    hasPermission,
    store,
    roles,
    permissions,
  };
}

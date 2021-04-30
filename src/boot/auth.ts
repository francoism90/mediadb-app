import { boot } from 'quasar/wrappers';
import { setAuthHeader } from 'src/boot/axios';
import { StoreState } from 'src/interfaces/store';
import { authUser } from 'src/repositories/user';
import { Store } from 'vuex';

async function checkUser(store: Store<StoreState>, redirectPath: string | null): Promise<boolean> {
  const { session } = store.state;

  if (!session.token || session.token.length === 0) {
    return false;
  }

  setAuthHeader(session.token);

  try {
    const response = await authUser({ token: session.token });
    await store.dispatch('session/setUser', response);

    return true;
  } catch {
    await store.dispatch('session/resetUser');

    store.commit('session/setRedirectPath', redirectPath);
  }

  return false;
}

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta?.auth)) {
      const isAuthenticated = await checkUser(store, to.fullPath);

      if (!isAuthenticated) {
        next({ path: '/login' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

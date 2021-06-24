import { boot } from 'quasar/wrappers';
import { initialize } from 'src/services/auth';

export default boot(({ router }) => {
  router.beforeEach(async (to, from, next) => {
    await initialize();

    if (to.matched.some((record) => record.meta?.auth)) {
      const isAuthenticated = await checkUser(to.fullPath);

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

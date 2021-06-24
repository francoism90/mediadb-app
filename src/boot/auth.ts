import { boot } from 'quasar/wrappers';
import { check, initialize } from 'src/services/auth';

export default boot(({ router }) => {
  router.beforeEach(async (to, from, next) => {
    await initialize();

    if (to.matched.some((record) => record.meta?.auth)) {
      if (!check(to)) {
        next({ path: '/login' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

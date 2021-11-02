import { boot } from 'quasar/wrappers';
import messages from 'src/i18n';
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: 'en-US',
  messages,
});

export default boot(({ app }) => {
  app.use(i18n);
});

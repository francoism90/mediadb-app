import { createIntl, IntlShape } from '@formatjs/intl';
import { boot } from 'quasar/wrappers';
import { InjectionKey } from 'vue';

export const intlKey: InjectionKey<IntlShape> = Symbol('intl-key');

export const intl = createIntl({
  locale: 'en-US',
  messages: {},
});

export default boot(({ app }) => {
  app.provide(intlKey, intl);

  app.config.globalProperties.$intl = intl;
});

import { createIntl, IntlShape } from '@formatjs/intl';
import { boot } from 'quasar/wrappers';
import { InjectionKey } from 'vue';

export const intl = createIntl({
  locale: 'en-US',
  messages: {},
});

export const intlKey: InjectionKey<IntlShape> = Symbol('intl-key');

export default boot(({ app }) => {
  app.provide(intlKey, intl);

  app.config.globalProperties.$intl = intl;
});

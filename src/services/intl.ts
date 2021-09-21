import { createIntl, IntlShape } from '@formatjs/intl';
import { InjectionKey } from 'vue';

export const intlKey: InjectionKey<IntlShape> = Symbol('intl-key');

export const intl = createIntl({
  locale: 'en-US',
  messages: {},
});

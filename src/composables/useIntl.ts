import { intlKey } from 'src/boot/intl';
import { inject } from 'vue';

export const useIntl = () => {
  const intl = inject(intlKey);

  return {
    intl,
  };
};

import { intlKey } from 'src/services/intl';
import { inject } from 'vue';

export default function useIntl() {
  const intl = inject(intlKey);

  return {
    intl,
  };
}

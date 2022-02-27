import { stringify as qs } from 'qs';

export const stringify = (params: unknown) => qs(params, {
  encodeValuesOnly: true,
  arrayFormat: 'comma',
  skipNulls: true,
  strictNullHandling: true,
});

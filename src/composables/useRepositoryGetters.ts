import { get } from 'lodash';
import { RepositoryState } from 'src/interfaces/store';
import { useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers';

export default function useRepositoryGetters(module: string) {
  const { params } = useNamespacedState<RepositoryState>(module, [
    'params',
  ]);

  const { getParams, isLoadable, nextPage } = useNamespacedGetters(module, [
    'getParams',
    'isLoadable',
    'nextPage',
  ]);

  const getValue = (key: string | number, defaultValue?: returnValue) => get(
    params.value, key, defaultValue || null,
  ) as string | number | null;

  return {
    params,
    getValue,
    getParams,
    isLoadable,
    nextPage,
  };
}

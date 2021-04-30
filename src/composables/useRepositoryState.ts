import { RepositoryState } from 'src/interfaces/store';
import { useNamespacedState } from 'vuex-composition-helpers';

export default function useRepositoryState(module: string) {
  const {
    id, params, data, meta,
  } = useNamespacedState<RepositoryState>(module, [
    'id',
    'params',
    'data',
    'meta',
  ]);

  return {
    id,
    params,
    data,
    meta,
  };
}

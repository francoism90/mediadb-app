import { RepositoryProps } from 'src/interfaces/repository';
import { useStore } from 'src/store';
import repositoryModule from 'src/store/repository';
import { useNamespacedActions } from 'vuex-composition-helpers';

export default function useRepository(props: RepositoryProps) {
  const $store = useStore();

  if (!$store.hasModule(props.module)) {
    $store.registerModule(props.module, repositoryModule);
  }

  const {
    resetStore, resetModels, initialize, setParams, setResponse,
  } = useNamespacedActions(props.module, [
    'resetStore',
    'resetModels',
    'initialize',
    'setParams',
    'setResponse',
  ]);

  if (props.module && props.params) {
    initialize(props);
  }

  return {
    initialize,
    resetModels,
    resetStore,
    setParams,
    setResponse,
  };
}

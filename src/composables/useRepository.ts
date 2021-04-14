import { RepositoryState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import repositoryModule from 'src/store/repository'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepository (store: string) {
  const $store = useStore()

  if (!$store.hasModule(store)) {
    $store.registerModule(store, repositoryModule)
  }

  const { setResponse } = useNamespacedActions(store, ['setResponse'])
  const { isLoadable, nextPage } = useNamespacedGetters(store, ['isLoadable', 'nextPage'])
  const { id, options, data, meta } = useNamespacedState<RepositoryState>(store, ['id', 'options', 'data', 'meta'])

  return {
    setResponse,
    isLoadable,
    nextPage,
    id,
    options,
    data,
    meta
  }
}

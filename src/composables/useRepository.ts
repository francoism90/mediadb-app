import { RepositoryState } from 'src/interfaces/store'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepository (store: string) {
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

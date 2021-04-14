import { RepositoryProps } from 'src/interfaces/repository'
import { RepositoryState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import repositoryModule from 'src/store/repository'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepository (props: RepositoryProps) {
  const $store = useStore()

  if (!$store.hasModule(props.module)) {
    $store.registerModule(props.module, repositoryModule)
  }

  const { id, params, data, meta, lastFetch } = useNamespacedState<RepositoryState>(props.module, [
    'id',
    'params',
    'data',
    'meta',
    'lastFetch'
  ])

  const { isLoadable, nextPage } = useNamespacedGetters(props.module, [
    'isLoadable',
    'nextPage'
  ])

  const { resetStore, initialize, setResponse } = useNamespacedActions(props.module, [
    'resetStore',
    'initialize',
    'setResponse'
  ])

  initialize(props)

  return {
    id,
    params,
    data,
    meta,
    lastFetch,
    resetStore,
    setResponse,
    isLoadable,
    nextPage
  }
}

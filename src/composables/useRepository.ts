import { RepositoryProps } from 'src/interfaces/repository'
import { RepositoryState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import repositoryModule from 'src/store/repository'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepository (props: RepositoryProps) {
  const $store = useStore()

  if (!$store.hasModule(props.store)) {
    $store.registerModule(props.store, repositoryModule)
  }

  const { resetStore, initialize, setResponse } = useNamespacedActions(props.store, [
    'resetStore', 'initialize', 'setResponse'
  ])

  const { isLoadable, nextPage } = useNamespacedGetters(props.store, [
    'isLoadable', 'nextPage'
  ])

  const { options, data, meta, updatedAt } = useNamespacedState<RepositoryState>(props.store, [
    'options', 'data', 'meta', 'updatedAt'
  ])

  // Populate store
  initialize(props)

  return {
    resetStore,
    setResponse,
    isLoadable,
    nextPage,
    options,
    data,
    meta,
    updatedAt
  }
}

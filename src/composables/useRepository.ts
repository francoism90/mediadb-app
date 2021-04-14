import { RepositoryProps } from 'src/interfaces/repository'
import { RepositoryState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import repositoryModule from 'src/store/repository'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepository (props: RepositoryProps) {
  const $store = useStore()

  if (!$store.hasModule(props.name)) {
    $store.registerModule(props.name, repositoryModule)
  }

  const { resetStore, initialize, setResponse } = useNamespacedActions(props.name, [
    'resetStore', 'initialize', 'setResponse'
  ])

  const { isLoadable, nextPage } = useNamespacedGetters(props.name, [
    'isLoadable', 'nextPage'
  ])

  const { id, options, data, meta } = useNamespacedState<RepositoryState>(props.name, [
    'id', 'options', 'data', 'meta'
  ])

  // Populate the store
  initialize(props)

  return {
    resetStore,
    setResponse,
    isLoadable,
    nextPage,
    id,
    options,
    data,
    meta
  }
}

import { get } from 'lodash'
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

  const { id, params, data, meta } = useNamespacedState<RepositoryState>(props.module, [
    'id',
    'params',
    'data',
    'meta'
  ])

  const { getParams, isLoadable, nextPage } = useNamespacedGetters(props.module, [
    'getParams',
    'isLoadable',
    'nextPage'
  ])

  const { resetStore, resetModels, initialize, setParams, setResponse } = useNamespacedActions(props.module, [
    'resetStore',
    'resetModels',
    'initialize',
    'setParams',
    'setResponse'
  ])

  if (props.module && props.params) {
    initialize(props)
  }

  const getParam = (key: string | number): string | number | null => {
    return get(params.value, key, null) as string | number | null
  }

  return {
    id,
    params,
    data,
    meta,
    resetModels,
    resetStore,
    getParam,
    getParams,
    setParams,
    setResponse,
    isLoadable,
    nextPage
  }
}

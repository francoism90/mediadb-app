import { get } from 'lodash'
import { RepositoryState } from 'src/interfaces/store'
import { useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepositoryGetters (module: string) {
  const { params } = useNamespacedState<RepositoryState>(module, [
    'params'
  ])

  const { getParams, isLoadable, nextPage } = useNamespacedGetters(module, [
    'getParams',
    'isLoadable',
    'nextPage'
  ])

  const getParam = (key: string): string | number | null => {
    return get(params.value, key, null) as string | number | null
  }

  return {
    params,
    getParam,
    getParams,
    isLoadable,
    nextPage
  }
}

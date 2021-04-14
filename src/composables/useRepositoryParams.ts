import { RepositoryParamsProps } from 'src/interfaces/repository'
import { RepositoryState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import { useNamespacedActions, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepositoryParams (props: RepositoryParamsProps) {
  const $store = useStore()

  if (!$store.hasModule(props.module)) {
    throw new Error('Invalid module given. Is it registered?')
  }

  const { params } = useNamespacedState<RepositoryState>(props.module, [
    'params'
  ])

  const { setParams } = useNamespacedActions(props.module, [
    'setParams'
  ])

  return {
    params,
    setParams
  }
}

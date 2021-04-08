import { useNamespacedActions, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepository (store: string) {
  const { setResponse } = useNamespacedActions(store, ['setResponse'])
  const { data, meta } = useNamespacedState(store, ['data', 'meta'])

  return {
    setResponse,
    data,
    meta
  }
}

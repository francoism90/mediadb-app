import { useNamespacedActions, useNamespacedState } from 'vuex-composition-helpers'

export default function useRepository (store: string) {
  const { setResponse } = useNamespacedActions(store, ['setResponse'])
  const { id, options, data, meta } = useNamespacedState(store, ['id', 'options', 'data', 'meta'])

  return {
    setResponse,
    id,
    options,
    data,
    meta
  }
}

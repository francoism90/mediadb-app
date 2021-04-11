import { useNamespacedActions, useNamespacedState } from 'vuex-composition-helpers'

export default function usePlayer (store: string) {
  const { setStatus } = useNamespacedActions(store, ['setStatus'])
  const { id, options, data, meta } = useNamespacedState(store, ['id', 'options', 'data', 'meta'])

  return {
    setStatus,
    id,
    options,
    data,
    meta
  }
}

import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useSession () {
  const { reset } = useNamespacedActions('session', ['reset'])
  const { isAuthenticated } = useNamespacedGetters('session', ['isAuthenticated'])
  const { user } = useNamespacedState('session', ['user'])

  return {
    reset,
    isAuthenticated,
    user
  }
}

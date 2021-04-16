import { SessionState } from 'src/interfaces/store'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function useSession () {
  const { reset } = useNamespacedActions('session', ['reset'])
  const { isAuthenticated } = useNamespacedGetters('session', ['isAuthenticated'])
  const { user } = useNamespacedState<SessionState>('session', ['user'])

  const hasRole = (payload: string): boolean | undefined => {
    if (!isAuthenticated || !user.value.roles) {
      return false
    }

    return user.value.roles.includes(payload)
  }

  const hasAnyRole = (payload: string): boolean => {
    if (!isAuthenticated || !user.value.roles) {
      return false
    }

    const roles = payload.split(',')

    for (const role of roles) {
      if (hasRole(role)) {
        return true
      }
    }

    return false
  }

  const hasPermission = (payload: string): boolean | undefined => {
    if (!isAuthenticated || !user.value.permissions) {
      return false
    }

    return user.value.permissions.includes(payload)
  }

  const hasAnyPermissions = (payload: string): boolean | undefined => {
    if (!isAuthenticated || !user.value.permissions) {
      return false
    }

    const permissions = payload.split(',')

    for (const permission of permissions) {
      if (hasRole(permission)) {
        return true
      }
    }

    return false
  }

  return {
    reset,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermissions,
    user
  }
}

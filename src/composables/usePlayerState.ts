import { PlayerState } from 'src/interfaces/store'
import { useNamespacedState } from 'vuex-composition-helpers'

export default function usePlayerState (module: string) {
  console.log(module)
  const { stream } = useNamespacedState<PlayerState>(module, [
    'stream'
  ])

  return {
    stream
  }
}

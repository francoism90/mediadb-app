import { MediaPlayer, MediaPlayerClass } from 'dashjs'
import { PlayerProps } from 'src/interfaces/player'
import { useStore } from 'src/store'
import playerModule from 'src/store/player'
import { ref } from 'vue'
import { useNamespacedActions } from 'vuex-composition-helpers'

export default function usePlayer (props: PlayerProps) {
  const $store = useStore()

  if (!$store.hasModule(props.module)) {
    $store.registerModule(props.module, playerModule)
  }

  const { resetStore, initialize } = useNamespacedActions(props.module, [
    'resetStore',
    'initialize'
  ])

  if (props.module && props.media) {
    initialize(props)
  }

  // eslint-disable-next-line no-undef
  const player = ref(<MediaPlayerClass | null>(null))

  const createPlayer = (dom: HTMLVideoElement | null): void => {
    const mediaFactory = MediaPlayer().create()
    mediaFactory.initialize(dom || undefined, props.media?.stream_url || '')

    player.value = mediaFactory
  }

  return {
    resetStore,
    initialize,
    createPlayer,
    player
  }
}

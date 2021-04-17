import { MediaPlayer, MediaPlayerClass } from 'dashjs'
import { Media } from 'src/interfaces/media'
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

  const { resetStore } = useNamespacedActions(props.module, [
    'resetStore'
  ])

  // eslint-disable-next-line no-undef
  const player = ref(<MediaPlayerClass | null>(null))

  const initPlayer = (dom: HTMLVideoElement | undefined, media: Media | null): void => {
    const createPlayer = MediaPlayer().create()
    createPlayer.initialize(dom || undefined, media?.stream_url || '')

    player.value = createPlayer
  }

  return {
    resetStore,
    initPlayer,
    player
  }
}

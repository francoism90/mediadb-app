import { MediaPlayer, MediaPlayerClass } from 'dashjs'
import { pick } from 'lodash'
import { PlayerProps } from 'src/interfaces/player'
import { useStore } from 'src/store'
import playerModule from 'src/store/player'
import { ref } from 'vue'
import { useNamespacedActions, useNamespacedMutations } from 'vuex-composition-helpers'

export default function usePlayer (props: PlayerProps) {
  const $store = useStore()

  if (!$store.hasModule(props.module)) {
    $store.registerModule(props.module, playerModule)
  }

  const { resetStore, initialize } = useNamespacedActions(props.module, [
    'resetStore',
    'initialize'
  ])

  const { setControls, setFullscreen, setPlaybackRate, setPause, setRequestTime, setStream, setTracks } = useNamespacedMutations(props.module, [
    'setControls',
    'setFullscreen',
    'setPlaybackRate',
    'setPause',
    'setRequestTime',
    'setStream',
    'setTracks'
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

  const setMetadata = (event: Event | null): void => {
    const target = event?.target as HTMLVideoElement

    setStream(pick(target, [
      'buffered',
      'currentSrc',
      'duration',
      'muted',
      'paused',
      'poster',
      'textTracks'
    ]))
  }

  const setPlayable = (event: Event | null): void => {
    const target = event?.target as HTMLVideoElement

    setStream(pick(target, [
      'currentTime',
      'ended',
      'paused',
      'played',
      'readyState'
    ]))
  }

  return {
    resetStore,
    initialize,
    createPlayer,
    setControls,
    setFullscreen,
    setPlaybackRate,
    setRequestTime,
    setTracks,
    setStream,
    setMetadata,
    setPause,
    setPlayable,
    player
  }
}

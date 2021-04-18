import { MediaPlayer, MediaPlayerClass } from 'dashjs'
import { pick } from 'lodash'
import { PlayerProps } from 'src/interfaces/player'
import { PlayerState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import playerModule from 'src/store/player'
import { ref } from 'vue'
import { useNamespacedActions, useNamespacedMutations, useNamespacedState } from 'vuex-composition-helpers'

export default function usePlayer (props: PlayerProps) {
  const $store = useStore()

  if (!$store.hasModule(props.module)) {
    $store.registerModule(props.module, playerModule)
  }

  const { request, stream } = useNamespacedState<PlayerState>(props.module, [
    'request',
    'stream'
  ])

  const { resetStore, initialize, sendRequest } = useNamespacedActions(props.module, [
    'resetStore',
    'initialize',
    'sendRequest'
  ])

  const { setStream } = useNamespacedMutations(props.module, [
    'setStream'
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
    sendRequest,
    setStream,
    setMetadata,
    setPlayable,
    player,
    request,
    stream
  }
}

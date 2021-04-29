import { pick, debounce } from 'lodash'
import { useQuasar } from 'quasar'
import * as shaka from 'shaka-player'
import { PlayerProps } from 'src/interfaces/player'
import { PlayerState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import playerModule from 'src/store/player'
import { onBeforeUnmount, ref, watch } from 'vue'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function usePlayer (props: PlayerProps) {
  const $q = useQuasar()
  const $store = useStore()

  const player = ref(<shaka.Player | null>(null))

  if (!$store.hasModule(props.module)) {
    $store.registerModule(props.module, playerModule)
  }

  const { media, model, properties } = useNamespacedState<PlayerState>(props.module, [
    'media',
    'model',
    'properties'
  ])

  const { resetStore, initialize, setProperties } = useNamespacedActions(props.module, [
    'resetStore',
    'initialize',
    'setProperties'
  ])

  const { isLoading } = useNamespacedGetters(props.module, [
    'isLoading'
  ])

  if (props.module && props.media) {
    initialize(props)
  }

  const createPlayer = async (dom: HTMLMediaElement | null): Promise<void> => {
    if (!dom) {
      console.debug('Waiting for HTMLVideoElement..')
      return
    }

    shaka.polyfill.installAll()

    if (shaka.Player.isBrowserSupported()) {
      await initPlayer(dom)
    } else {
      console.error('Browser not supported')
    }
  }

  const initPlayer = async (dom: HTMLMediaElement | null): Promise<void> => {
    const shakaPlayer = new shaka.Player(dom)

    shakaPlayer.configure({
      streaming: {
        jumpLargeGaps: true,
        ignoreTextStreamFailures: true,
        alwaysStreamText: true
      }
    })

    try {
      player.value = await shakaPlayer.load(props.media?.stream_url || '') as shaka.Player
    } catch (e: unknown) {
      console.error(e)
    }
  }

  const readonlyProperties = (event: Event | null): void => {
    const target = event?.target as HTMLMediaElement

    if (!event || !target) {
      console.debug('Waiting for HTMLMediaElement..')
      return
    }

    setProperties(pick(target, [
      'buffered',
      'currentSrc',
      'currentTime',
      'duration',
      'ended',
      'error',
      'muted',
      'networkState',
      'paused',
      'played',
      'readyState',
      'seekable',
      'seeking',
      'textTracks'
    ]))
  }

  const syncProperties = debounce(readonlyProperties, 100)

  // watch(() => player.value?.getTextTracks(), value => {
  //   setProperties({ textTracks: value })
  // })

  watch(() => $q.fullscreen.isActive, value => {
    setProperties({ fullscreen: value })
  })

  onBeforeUnmount(() => {
    player.value?.detach()
    player.value?.destroy()
  })

  return {
    resetStore,
    initialize,
    setProperties,
    syncProperties,
    createPlayer,
    isLoading,
    player,
    model,
    media,
    properties
  }
}

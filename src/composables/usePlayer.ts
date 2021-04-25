import { MediaPlayer as MediaFactory, MediaPlayerClass } from 'dashjs'
import { pick } from 'lodash'
import { useQuasar } from 'quasar'
import { PlayerProps } from 'src/interfaces/player'
import { PlayerState } from 'src/interfaces/store'
import { useStore } from 'src/store'
import playerModule from 'src/store/player'
import { onBeforeUnmount, ref, watch } from 'vue'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function usePlayer (props: PlayerProps) {
  const $q = useQuasar()
  const $store = useStore()

  // eslint-disable-next-line no-undef
  const player = ref(<MediaPlayerClass | null>(null))

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

  const createPlayer = (dom: HTMLVideoElement | null): void => {
    if (!dom) {
      console.debug('Waiting for HTMLVideoElement..')
      return
    }

    player.value = MediaFactory().create()
    player.value?.initialize(dom || undefined, props.media?.stream_url || '', true)
    player.value?.updateSettings({
      streaming: {
        bufferToKeep: 30,
        smallGapLimit: 0.5,
        bufferTimeAtTopQuality: 60,
        fastSwitchEnabled: true
      }
    })
    player.value?.preload()
  }

  const syncProperties = (event: Event | null): void => {
    const target = event?.target as HTMLVideoElement

    if (!event || !target) {
      console.debug('Waiting for HTMLVideoElement..')
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

  watch(() => $q.fullscreen.isActive, value => {
    setProperties({ fullscreen: value })
  })

  onBeforeUnmount(() => player.value?.reset())

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

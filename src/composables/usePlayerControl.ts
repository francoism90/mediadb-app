import { PlayerState } from 'src/interfaces/store'
import { useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default function usePlayerState (module: string) {
  const { controls, fullscreen, media, model, playbackRate, stream, tracks } = useNamespacedState<PlayerState>(module, [
    'controls',
    'fullscreen',
    'media',
    'model',
    'playbackRate',
    'stream',
    'tracks'
  ])

  const { setControls, setFullscreen, setPlaybackRate, setRequestTime, setTracks } = useNamespacedGetters(module, [
    'setControls',
    'setFullscreen',
    'setPlaybackRate',
    'setRequestTime',
    'setTracks'
  ])

  return {
    setControls,
    setFullscreen,
    setPlaybackRate,
    setRequestTime,
    setTracks,
    controls,
    fullscreen,
    media,
    model,
    playbackRate,
    stream,
    tracks
  }
}

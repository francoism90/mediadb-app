import { PlayerState } from 'src/interfaces/store'
import { useNamespacedState } from 'vuex-composition-helpers'

export default function usePlayerState (module: string) {
  const { controls, fullscreen, media, model, playbackRate, pause, stream, tracks } = useNamespacedState<PlayerState>(module, [
    'controls',
    'fullscreen',
    'media',
    'model',
    'playbackRate',
    'pause',
    'stream',
    'tracks'
  ])

  return {
    controls,
    fullscreen,
    media,
    model,
    playbackRate,
    pause,
    stream,
    tracks
  }
}

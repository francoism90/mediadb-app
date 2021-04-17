import { MediaPlayer, MediaPlayerClass } from 'dashjs'
import { Media } from 'src/interfaces/media'
import { computed, ref, watch } from 'vue'

export default function usePlayer () {
  // eslint-disable-next-line no-undef
  const player = ref(<MediaPlayerClass | null>(null))

  const initPlayer = (dom: HTMLVideoElement | undefined, media: Media | null): void => {
    const createPlayer = MediaPlayer().create()
    createPlayer.initialize(dom || undefined, media?.stream_url || '')

    player.value = createPlayer
  }

  const getDuration = () => {
    console.log('clicked')
    console.log(player.value?.duration())
  }

  const duration = computed(() => player.value?.duration())

  watch(player, () => {
    // console.log(value)
  })

  return {
    initPlayer,
    player,
    duration,
    getDuration
  }
}

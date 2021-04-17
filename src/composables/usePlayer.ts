import { MediaPlayer, MediaPlayerClass } from 'dashjs'
import { Media } from 'src/interfaces/media'
import { ref } from 'vue'

export default function usePlayer () {
  // eslint-disable-next-line no-undef
  const player = ref(<MediaPlayerClass | null>(null))

  const initPlayer = (dom: HTMLDivElement | undefined, media: Media | null) => {
    const createPlayer = MediaPlayer().create()
    createPlayer.initialize(dom || undefined, media?.stream_url || '')

    console.log(dom)
    console.log(media)

    player.value = createPlayer
  }

  return {
    initPlayer,
    player
  }
}

import { echoKey } from 'src/boot/echo'
import { Video } from 'src/interfaces/video'
import { find } from 'src/repositories/video'
import { inject, onMounted, Ref, ref, watch } from 'vue'

interface Props {
  id: Ref<string>
}

export default function useVideo (props: Props) {
  const video = ref(<Video>{})

  const echo = inject(echoKey)

  const fetchVideo = async (): Promise<void> => {
    const response = await find(props.id.value)

    video.value = response.data
  }

  const subscribe = (id: string | number): void => {
    echo?.private(`video.${id}`)
      .listen('.video.updated', fetchVideo)
      .listen('.video.favorited', fetchVideo)
  }

  const unsubscribe = (id: string | number): void => {
    echo?.leave(`video.${id}`)
  }

  onMounted(fetchVideo)

  watch(props.id, fetchVideo)

  return {
    fetchVideo,
    subscribe,
    unsubscribe,
    video
  }
}

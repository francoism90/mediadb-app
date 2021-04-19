import { echoKey } from 'src/boot/echo'
import { Video } from 'src/interfaces/video'
import { find } from 'src/repositories/video'
import { inject, onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'

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

  const subscribe = (): void => {
    echo?.private(`video.${props.id.value}`)
      .listen('.video.updated', async () => {
        await fetchVideo()
      })
      .listen('.video.favorited', async () => {
        await fetchVideo()
      })
  }

  onMounted(fetchVideo)
  onMounted(subscribe)

  watch(props.id, (value, oldValue): void => {
    echo?.leave(`video.${oldValue}`)
  })

  watch(props.id, fetchVideo)
  watch(props.id, subscribe)

  onBeforeUnmount(() => {
    echo?.leave(props.id.value)
  })

  return {
    fetchVideo,
    video
  }
}

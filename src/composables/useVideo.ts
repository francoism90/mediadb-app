import { Video } from 'src/interfaces/video'
import { find } from 'src/repositories/video'
import { onMounted, Ref, ref, watch } from 'vue'

interface Props {
  id: Ref<string>
}

export default function useVideo (props: Props) {
  const video = ref(<Video>{})

  const fetchVideo = async (): Promise<void> => {
    const response = await find(props.id.value)

    video.value = response.data
  }

  onMounted(fetchVideo)

  watch(props.id, fetchVideo)

  return {
    fetchVideo,
    video
  }
}

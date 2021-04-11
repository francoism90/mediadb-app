import { ref, Ref, onMounted, watch } from 'vue'
import { Video } from 'src/interfaces/video'
import { find } from 'src/repositories/video'

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

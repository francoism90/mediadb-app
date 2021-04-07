import { Video, VideosParameters } from 'src/interfaces/video'
import { RepositoryMeta } from 'src/interfaces/repository'
import { findAll } from 'src/repositories/video'
import { ref, onMounted, watch } from 'vue'

export default function useVideos (params: VideosParameters) {
  const models = ref<Video[]>([])
  const meta = ref<RepositoryMeta>()

  const getVideos = async () => {
    const response = await findAll(params)

    models.value = response.data
    meta.value = response.meta
  }

  onMounted(async () => {
    await getVideos()
  })

  watch(params, async () => {
    await getVideos()
  })

  return {
    models,
    meta
  }
}

import { VideoModel } from 'src/interfaces/model'
import { RepositoryMeta, VideosParameters } from 'src/interfaces/repository'
import { findAll } from 'src/repositories/video'
import { ref, onMounted } from 'vue'

export default function useVideos (params: VideosParameters) {
  const models = ref<VideoModel[]>([])
  const meta = ref<RepositoryMeta>()

  const getVideos = async () => {
    const response = await findAll(params)

    models.value = response.data
    meta.value = response.meta
  }

  onMounted(async () => {
    await getVideos()
  })

  return {
    models,
    meta
  }
}

import { VideoModel } from 'src/interfaces/model'
import { RepositoryVideosParams } from 'src/interfaces/repository'
import { findAll } from 'src/repositories/video'
import { ref, onMounted } from 'vue'

export default function useVideoRepositories (params: RepositoryVideosParams) {
  const repositories = ref<VideoModel[]>([])

  const getVideos = async () => {
    const response = await findAll(params)

    repositories.value = response.data
  }

  onMounted(async () => {
    await getVideos()
  })

  return {
    repositories
  }
}

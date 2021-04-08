import { Video, VideosParameters } from 'src/interfaces/video'
import { RepositoryMeta } from 'src/interfaces/repository'
import { findAll } from 'src/repositories/video'
import { ref } from 'vue'

export default function useVideos (params: VideosParameters) {
  const foo = ref<Video[]>([])
  const meta = ref<RepositoryMeta>({})

  const getVideos = async () => {
    const response = await findAll(params)

    console.log('compose', response.data)

    foo.value = response.data
    meta.value = response.meta
  }

  // watch(params, async () => {
  //   await getVideos()
  // })

  return {
    getVideos,
    foo,
    meta
  }
}

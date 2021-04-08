import { VideosResponse, VideosParameters } from 'src/interfaces/video'
import { findAll } from 'src/repositories/video'

export default function useVideos (params: VideosParameters) {
  const getVideos = async (): Promise<VideosResponse> => {
    return await findAll(params)
  }

  // watch(params, async () => {
  //   await getVideos()
  // })

  return {
    getVideos
  }
}

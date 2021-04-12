import { VideosParameters, VideosResponse } from 'src/interfaces/video'
import { findAll } from 'src/repositories/video'

export default function useVideos () {
  const findVideos = async (params: VideosParameters): Promise<VideosResponse> => {
    return await findAll(params)
  }

  // watch(params, async () => {
  //   await getVideos()
  // })

  return {
    findVideos
  }
}

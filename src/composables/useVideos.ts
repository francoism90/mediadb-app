import { VideosParameters, VideosResponse } from 'src/interfaces/video'
import { findAll } from 'src/repositories/video'

export default function useVideos () {
  const fetchVideos = async (params: VideosParameters): Promise<VideosResponse> => {
    return await findAll(params)
  }

  return {
    fetchVideos
  }
}

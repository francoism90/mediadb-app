import useRepository from 'src/composables/useRepository'
import { VideosParameters, VideosProps } from 'src/interfaces/video'
import { findAll } from 'src/repositories/video'

export default function useVideos (props: VideosProps) {
  const { id, isLoadable, params, nextPage, data, meta, resetModels, getParams, setParams, setResponse } = useRepository(props.repository)

  const fetchVideos = async (): Promise<void> => {
    const fetch = isLoadable.value as boolean

    if (fetch) {
      const response = await findAll(params.value)
      await setResponse(response)
    }
  }

  const loadVideos = async (payload: VideosParameters, reset?: boolean): Promise<void> => {
    const pageNumber = nextPage.value as number
    const pageParams = { ...{ 'page[number]': pageNumber }, ...payload } as VideosParameters

    await setParams(pageParams)

    if (reset) {
      await resetModels()
    }

    await fetchVideos()
  }

  return {
    fetchVideos,
    loadVideos,
    getParams,
    setParams,
    id,
    data,
    meta
  }
}

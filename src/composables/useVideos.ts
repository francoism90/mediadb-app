import useRepository from 'src/composables/useRepository'
import { VideosParameters, VideosProps } from 'src/interfaces/video'
import { findAll } from 'src/repositories/video'

export default function useVideos (props: VideosProps) {
  const { id, isLoadable, data, meta, nextPage, resetModels, getParam, getParams, setParams, setResponse } = useRepository(props.repository)

  const fetchVideos = async (): Promise<void> => {
    const fetch = isLoadable.value as boolean

    if (fetch) {
      const pageNumber = nextPage.value as number
      const pageParams = { ...{ 'page[number]': pageNumber }, ...getParams.value } as VideosParameters

      await setParams(pageParams)

      const response = await findAll(pageParams)
      await setResponse(response)
    }
  }

  return {
    fetchVideos,
    resetModels,
    getParam,
    setParams,
    isLoadable,
    id,
    data,
    meta
  }
}

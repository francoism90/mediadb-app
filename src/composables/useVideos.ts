import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import useRepositoryState from 'src/composables/useRepositoryState'
import { RepositoryProps } from 'src/interfaces/repository'
import { VideosParameters } from 'src/interfaces/video'
import { findAll } from 'src/repositories/video'

export default function useVideos (props: RepositoryProps) {
  const { resetModels, resetStore, setParams, setResponse } = useRepository(props)

  const { getParam, getParams, isLoadable, nextPage } = useRepositoryGetters(props.module)

  const { id, data, meta } = useRepositoryState(props.module)

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
    resetStore,
    getParam,
    setParams,
    isLoadable,
    id,
    data,
    meta
  }
}

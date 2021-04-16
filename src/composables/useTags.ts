import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import useRepositoryState from 'src/composables/useRepositoryState'
import { RepositoryProps } from 'src/interfaces/repository'
import { TagsParameters } from 'src/interfaces/tag'
import { findAll } from 'src/repositories/tag'

export default function useTags (props: RepositoryProps) {
  const { resetModels, setParams, setResponse } = useRepository(props)

  const { getParam, getParams, isLoadable, nextPage } = useRepositoryGetters(props.module)

  const { id, data, meta } = useRepositoryState(props.module)

  const fetchTags = async (): Promise<void> => {
    const fetch = isLoadable.value as boolean

    if (fetch) {
      const pageNumber = nextPage.value as number
      const pageParams = { ...{ 'page[number]': pageNumber }, ...getParams.value } as TagsParameters
      await setParams(pageParams)

      const response = await findAll(pageParams)
      await setResponse(response)
    }
  }

  return {
    fetchTags,
    resetModels,
    getParam,
    setParams,
    id,
    data,
    meta
  }
}

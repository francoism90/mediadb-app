import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import useRepositoryState from 'src/composables/useRepositoryState'
import { RepositoryProps } from 'src/interfaces/repository'
import { TagsParameters } from 'src/interfaces/tag'
import { findAll } from 'src/repositories/tag'

export default function useTags (props: RepositoryProps) {
  const { resetModels, resetStore, setParams, setResponse } = useRepository(props)

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

  // eslint-disable-next-line @typescript-eslint/ban-types
  const filterTags = async (val: string, update: Function, abort: Function): Promise<void> => {
    if (val.length < 1) {
      abort()
      return
    }

    await setParams({
      params: { 'filter[query]': val, 'page[number]': 1 },
      reset: true
    })

    await fetchTags()
    await update()
  }

  return {
    fetchTags,
    filterTags,
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

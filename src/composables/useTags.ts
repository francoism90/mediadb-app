import useRepository from 'src/composables/useRepository'
import { TagsParameters, TagsProps } from 'src/interfaces/tag'
import { findAll } from 'src/repositories/tag'

export default function useTags (props: TagsProps) {
  const { id, isLoadable, params, nextPage, data, meta, resetModels, setParams, setResponse } = useRepository(props.repository)

  const fetchTags = async (): Promise<void> => {
    const fetch = isLoadable.value as boolean

    if (fetch) {
      const response = await findAll(params.value)
      await setResponse(response)
    }
  }

  const loadTags = async (params: TagsParameters, reset?: boolean, update?: boolean): Promise<void> => {
    if (reset) {
      await resetModels()
    }

    const pageNumber = nextPage.value as number
    const pageParams = { ...{ 'page[number]': pageNumber, ...params } } as TagsParameters

    await setParams(pageParams)

    if (update || update === undefined) {
      await fetchTags()
    }
  }

  return {
    fetchTags,
    loadTags,
    id,
    data,
    meta
  }
}

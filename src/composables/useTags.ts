import useRepository from 'src/composables/useRepository'
import { TagsProps } from 'src/interfaces/tag'
import { findAll } from 'src/repositories/tag'

export default function useTags (props: TagsProps) {
  const { id, isLoadable, params, nextPage, data, meta, resetModels, setParams, setResponse } = useRepository(props.repository)

  const fetchTags = async (): Promise<void> => {
    const pageNumber = nextPage.value as number
    const fetch = isLoadable.value as boolean

    if (fetch) {
      await setParams({ 'page[number]': pageNumber })

      const response = await findAll(params.value)
      await setResponse(response)
    }
  }

  return {
    fetchTags,
    resetModels,
    id,
    data,
    meta
  }
}

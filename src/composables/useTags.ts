import { QSelect } from 'quasar'
import useRepository from 'src/composables/useRepository'
import { TagsProps } from 'src/interfaces/tag'
import { findAll } from 'src/repositories/tag'
import { nextTick } from 'vue'

interface QSelectProps {
  to: number,
  ref: QSelect
}

export default function useTags (props: TagsProps) {
  const { id, isLoadable, params, nextPage, data, meta, setParams, setResponse } = useRepository(props.repository)

  const fetchTags = async (): Promise<void> => {
    const pageNumber = nextPage.value as number
    const fetch = isLoadable.value as boolean

    if (fetch) {
      // Increase page number
      await setParams({ 'page[number]': pageNumber || 1 })

      // Set response
      const response = await findAll(params.value)

      await setResponse(response)
    }
  }

  const scrollTags = async (args: QSelectProps): Promise<void> => {
    const fetch = isLoadable.value as boolean

    if (fetch) {
      await fetchTags()

      await nextTick(() => {
        args.ref.refresh()
      })
    }
  }

  return {
    fetchTags,
    scrollTags,
    id,
    data,
    meta
  }
}

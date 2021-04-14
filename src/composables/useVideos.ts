import useRepository from 'src/composables/useRepository'
import { VideosProps } from 'src/interfaces/video'
import { findAll } from 'src/repositories/video'

export default function useVideos (props: VideosProps) {
  const { id, isLoadable, data, meta, setResponse } = useRepository(props.repository)

  const fetchVideos = async (): Promise<void> => {
    // const pageNumber = nextPage.value as number
    const fetchable = isLoadable.value as boolean

    if (fetchable) {
      // 'page[number]': pageNumber || 1

      const response = await findAll(props.repository.params)

      await setResponse(response)
    }
  }

  console.log(id)

  return {
    fetchVideos,
    id,
    data,
    meta
  }
}

import { TagsParameters, TagsResponse } from 'src/interfaces/tag'
import { findAll } from 'src/repositories/tag'

export default function useTags () {
  const findTags = async (params: TagsParameters): Promise<TagsResponse> => {
    return await findAll(params)
  }

  return {
    findTags
  }
}

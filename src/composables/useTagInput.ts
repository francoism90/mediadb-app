import { ref } from 'vue';
import {
  TagModel, TagsQuery, TagsLinks, TagsMeta, TagsResponse,
} from 'src/interfaces/tag';
import { all } from 'src/repositories/tag';

export default function useTagInput() {
  const data = ref<TagModel[]>();
  const meta = ref<TagsMeta>();
  const links = ref<TagsLinks>();

  const reset = (): void => {
    data.value = [];
    meta.value = {};
    links.value = {};
  };

  const populate = (payload: TagsResponse): void => {
    data.value = payload.data;
    meta.value = payload.meta;
    links.value = payload.links;
  };

  const fetch = async (payload: TagsQuery): Promise<void> => {
    const response = await all(payload);
    populate(response);
  };

  return {
    fetch,
    reset,
    populate,
  };
}

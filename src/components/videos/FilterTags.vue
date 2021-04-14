<template>
  <q-toolbar>
    <q-select
      v-model="model"
      :options="data"
      :loading="loading"
      :input-debounce="650"
      :max-values="5"
      :virtual-scroll-slice-size="10"
      option-value="name"
      option-label="name"
      dropdown-icon="o_expand_more"
      display-value="Tags"
      dark
      multiple
      options-dark
      use-input
      @virtual-scroll="scrollTags"
    >
      <template #option="scope">
        <q-item
          v-bind="scope.itemProps"
        >
          <q-item-section>
            <q-item-label>
              {{ scope.opt.name }}
            </q-item-label>

            <q-item-label caption>
              {{ scope.opt.type }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-toolbar>
</template>

<script lang="ts">
import useTags from 'src/composables/useTags'
import { Tag, TagsParameters } from 'src/interfaces/tag'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'VideosFilterTags',

  setup () {
    const model = ref<Tag[]>([]) // TODO: move to store
    const loading = ref(false) // TODO: move to store?

    const { fetchTags, scrollTags, id, data, meta } = useTags({
      repository: {
        module: 'videos-tags',
        params: <TagsParameters>{ sort: 'name', 'page[number]': 1, 'page[size]': 5 }
      }
    })

    onMounted(fetchTags)

    return {
      fetchTags,
      scrollTags,
      model,
      loading,
      id,
      data,
      meta
    }
  }
})
</script>

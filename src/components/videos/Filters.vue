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
      @virtual-scroll="tagsScroll"
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
import { QSelect } from 'quasar'
import useRepository from 'src/composables/useRepository'
import useTags from 'src/composables/useTags'
import { Tag } from 'src/interfaces/tag'
import { defineComponent, nextTick, onMounted, PropType, ref } from 'vue'

interface scrollArgs {
  to: number,
  ref: QSelect
}

export default defineComponent({
  name: 'VideosFilter',

  props: {
    store: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const model = ref<Tag[]>([]) // TODO: move to store
    const loading = ref(false) // TODO: move to store?

    const { fetchTags } = useTags()
    const { setResponse, isLoadable, nextPage, data, meta } = useRepository({
      store: `${props.store}-tags`
    })

    const preloadTags = async (): Promise<void> => {
      if (loading.value !== true && isLoadable.value) {
        loading.value = true

        const response = await fetchTags({ 'page[size]': 5 })
        await setResponse(response)

        loading.value = false
      }
    }

    const tagsScroll = async (args: scrollArgs): Promise<void> => {
      const pageNumber = nextPage.value as number

      if (loading.value !== true && isLoadable.value) {
        loading.value = true

        const response = await fetchTags({ 'page[size]': 5, 'page[number]': pageNumber })
        await setResponse(response)

        await nextTick(() => {
          args.ref.refresh()
          loading.value = false
        })
      }
    }

    onMounted(preloadTags)

    return {
      loading,
      model,
      data,
      meta,
      tagsScroll
    }
  }
})
</script>

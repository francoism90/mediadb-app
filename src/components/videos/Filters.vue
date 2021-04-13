<template>
  <q-toolbar>
    <q-select
      v-model="model"
      dark
      :options="data"
      :loading="loading"
      label="Tags"
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
import { useStore } from 'src/store'
import repositoryModule from 'src/store/repository'
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
    const model = ref(null)
    const loading = ref(false)
    const tags = ref<Tag[] | null>(null)

    const store = useStore()

    if (!store.hasModule(`${props.store}-tags`)) {
      store.registerModule(`${props.store}-tags`, repositoryModule)
    }

    const { findTags } = useTags()
    const { setResponse, isLoadable, nextPage, data, meta } = useRepository(`${props.store}-tags`)

    const fetchTags = async (): Promise<void> => {
      // console.log(isLoadable.value)
      if (loading.value !== true && isLoadable.value) {
        const response = await findTags({ 'page[size]': 5 })

        await setResponse(response)
      }
    }

    const tagsScroll = async (args: scrollArgs): Promise<void> => {
      const pageNumber = nextPage.value as number

      if (loading.value !== true && isLoadable.value) {
        loading.value = true

        const response = await findTags({ 'page[size]': 5, 'page[number]': pageNumber })

        await setResponse(response)

        await nextTick(() => {
          args.ref.refresh()
          loading.value = false
        })
      }
    }

    onMounted(fetchTags)

    return {
      tags,
      loading,
      model,
      data,
      meta,
      tagsScroll
    }
  }
})
</script>

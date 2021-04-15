<template>
  <q-form
    v-show="visible"
    class="q-mx-md header-search"
    @submit.prevent
  >
    <q-select
      :model-value="model"
      :options="data"
      :input-debounce="750"
      behavior="menu"
      class="full-height full-width"
      dark
      fill-input
      filled
      hide-bottom-space
      hide-dropdown-icon
      hide-selected
      option-label="name"
      option-value="name"
      options-dark
      placeholder="Search videos"
      square
      use-input
      @input-value="setModel"
      @filter="filterTags"
    >
      <template #prepend>
        <q-icon
          aria-label="Search"
          name="search"
          color="grey-5"
          class="q-mx-none cursor-pointer"
        />
      </template>

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
  </q-form>
</template>

<script lang="ts">
import useTags from 'src/composables/useTags'
import useVideos from 'src/composables/useVideos'
import { TagsParameters } from 'src/interfaces/tag'
import { router } from 'src/router'
import { computed, defineComponent, ref } from 'vue'

const searchable = [
  {
    placeholder: 'Search videos',
    route: { name: 'home' },
    module: 'videos'
  }
]

export default defineComponent({
  name: 'AppSearch',

  setup () {
    const model = ref('')
    const $router = router

    const visible = computed(() => {
      const currentRoute = $router.currentRoute.value

      return searchable.find(x => x.route.name === currentRoute.name)
    })

    const {
      getParam: getVideosParam,
      setParams: setVideosParams
    } = useVideos({ module: 'videos' })

    model.value = getVideosParam('filter[query]') as string

    const setModel = async (val: string): Promise<void> => {
      await setVideosParams({
        params: { 'filter[query]': val, 'page[number]': 1 },
        reset: true
      })

      model.value = val
    }

    const { fetchTags, setParams, data } = useTags({
      module: 'videos-tags',
      params: <TagsParameters>{ sort: 'recommended', 'page[number]': 1, 'page[size]': 5 }
    })

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
      visible,
      model,
      filterTags,
      setModel,
      data
    }
  }
})
</script>

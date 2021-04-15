<template>
  <q-form
    v-show="search"
    class="q-mx-md header-search"
    @submit.prevent
  >
    <q-select
      :model-value="model"
      :options="data"
      :input-debounce="900"
      :placeholder="search.label"
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
import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import useTags from 'src/composables/useTags'
import { TagsParameters } from 'src/interfaces/tag'
import { router } from 'src/router'
import { defineComponent, ref } from 'vue'

const searchable = [
  {
    label: 'Search videos',
    route: { name: 'home' },
    module: 'videos'
  }
]

export default defineComponent({
  name: 'AppSearch',

  setup () {
    const $router = router
    const currentRoute = $router.currentRoute.value

    const model = ref('')
    const search = ref(searchable.find(x => x.route.name === currentRoute.name))

    const { setParams: setModuleParams } = useRepository({ module: search?.value?.module || 'videos' })
    const { getParam: getModuleParam } = useRepositoryGetters(search?.value?.module || 'videos')

    model.value = getModuleParam('filter[query]') as string

    const setModel = async (val: string): Promise<void> => {
      await setModuleParams({
        params: { 'filter[query]': val, 'page[number]': 1 },
        reset: true
      })

      model.value = val
    }

    const { fetchTags, setParams, data } = useTags({
      module: 'search-tags',
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
      search,
      model,
      filterTags,
      setModel,
      data
    }
  }
})
</script>

<template>
  <q-form
    v-show="currentSearch"
    class="q-mx-md header-search"
    @submit.prevent
  >
    <q-select
      :model-value="model"
      :options="data"
      :input-debounce="500"
      :placeholder="currentSearch?.label || 'Search'"
      behavior="menu"
      class="full-height full-width"
      fill-input
      filled
      hide-bottom-space
      hide-dropdown-icon
      hide-selected
      option-label="name"
      option-value="name"
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
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>
              {{ scope.opt.name }}
            </q-item-label>

            <q-item-label
              caption
              class="text-capitalize"
            >
              {{ scope.opt.type }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-form>
</template>

<script lang="ts">
import { debounce } from 'quasar'
import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import useTags from 'src/composables/useTags'
import { TagsParameters } from 'src/interfaces/tag'
import { router } from 'src/router'
import { defineComponent, onMounted, ref, watch } from 'vue'

interface Searchable {
  label: string,
  route: string,
  module: string
}

const searchable = [
  { label: 'Search videos', route: 'home', module: 'videos' }
]

export default defineComponent({
  name: 'AppSearch',

  setup () {
    const currentSearch = ref<Searchable>()
    const model = ref('')

    const setSearchable = () => {
      currentSearch.value = searchable.find(x => x.route === router.currentRoute.value.name)
    }

    const { setParams: setModuleParams } = useRepository({ module: 'videos' })
    const { getParam: getModuleParam } = useRepositoryGetters('videos')

    const queryFilter = getModuleParam('filter[query]') as string

    const setModel = debounce(async (val: string): Promise<void> => {
      model.value = val

      await setModuleParams({
        params: { 'filter[query]': val, 'page[number]': 1 },
        reset: true
      })
    }, 500)

    const { filterTags, data } = useTags({
      module: 'search-tags',
      params: <TagsParameters>{ sort: 'recommended', 'page[number]': 1, 'page[size]': 5 }
    })

    onMounted(() => {
      model.value = queryFilter
    })

    watch(router.currentRoute, setSearchable, { immediate: true })

    return {
      currentSearch,
      model,
      filterTags,
      setModel,
      data
    }
  }
})
</script>

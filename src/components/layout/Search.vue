<template>
  <q-form
    v-show="search"
    class="q-mx-md header-search"
    @submit.prevent
  >
    <tag-input
      v-model:tags="query"
      :max-values="15"
      :placeholder="search?.label || 'Search'"
      behavior="menu"
      class="full-height full-width"
      fill-input
      filled
      hide-bottom-space
      hide-dropdown-icon
      hide-selected
      square
      use-input
      @input-value="setModel"
    />
  </q-form>
</template>

<script lang="ts">
import { debounce } from 'quasar'
import TagInput from 'src/components/form/TagInput.vue'
import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import { router } from 'src/router'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'

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

  components: {
    TagInput
  },

  setup () {
    const search = ref<Searchable>()
    const query = ref<string>('')

    const configSearch = () => {
      search.value = searchable.find(x => x.route === router.currentRoute.value.name)
    }

    const { setParams: setModuleParams } = useRepository({ module: 'videos' })
    const { getParam: getModuleParam } = useRepositoryGetters('videos')

    const setModel = debounce(async (val: string): Promise<void> => {
      query.value = val

      await setModuleParams({
        params: { 'filter[query]': val, 'page[number]': 1 },
        reset: true
      })
    }, 500)

    const queryFilter = computed(() => getModuleParam('filter[query]') as string)

    onMounted(() => {
      query.value = queryFilter.value
    })

    watch(router.currentRoute, configSearch, { immediate: true })

    return {
      query,
      search,
      setModel
    }
  }
})
</script>

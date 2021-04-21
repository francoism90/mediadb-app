<template>
  <q-form
    class="q-mx-md header-search"
    @submit.prevent
  >
    <tag-input
      v-model:tags="query"
      placeholder="Search Videos"
      behavior="menu"
      class="full-height full-width"
      fill-input
      filled
      hide-bottom-space
      hide-dropdown-icon
      hide-selected
      square
      use-input
      @input-value="performQuery"
    />
  </q-form>
</template>

<script lang="ts">
import { debounce } from 'quasar'
import TagInput from 'src/components/form/TagInput.vue'
import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VideoSearch',

  components: {
    TagInput
  },

  setup () {
    const { setParams: setModuleParams } = useRepository({ module: 'videos' })
    const { getParam: getModuleParam } = useRepositoryGetters('videos')

    const currentQuery = getModuleParam('filter[query]') as string
    const query = ref(currentQuery)

    const performQuery = debounce(async (val: string): Promise<void> => {
      query.value = val

      await setModuleParams({
        params: { 'filter[query]': val, 'page[number]': 1 },
        reset: true
      })
    }, 500)

    return {
      query,
      performQuery
    }
  }
})
</script>

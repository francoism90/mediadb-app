<template>
  <q-form
    v-if="visible"
    class="q-mx-md header-search"
    @submit.prevent
  >
    <q-select
      v-model="model"
      :options="data"
      :input-debounce="650"
      :virtual-scroll-slice-size="5"
      class="full-height full-width"
      option-value="name"
      option-label="name"
      placeholder="Search videos"
      clearable
      hide-bottom-space
      filled
      square
      dark
      fill-input
      options-dark
      use-input
      @filter="filterTags"
    >
      <template #prepend>
        <q-icon
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
    const $router = router

    const visible = computed(() => {
      const currentRoute = $router.currentRoute.value

      return searchable.find(x => x.route.name === currentRoute.name)
    })

    const model = ref('')

    const { loadTags, data } = useTags({
      repository: {
        module: 'videos-tags',
        params: <TagsParameters>{ sort: 'recommended', 'page[number]': 1, 'page[size]': 5 }
      }
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    const filterTags = async (val: string, update: Function, abort: Function): Promise<void> => {
      if (val.length < 1) {
        abort()
        return
      }

      await loadTags({ query: val, 'page[number]': 1 }, true)
      await update()
    }

    return {
      visible,
      model,
      filterTags,
      data
    }
  }
})
</script>

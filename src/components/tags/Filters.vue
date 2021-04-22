<template>
  <q-btn
    icon="filter_list"
    label="Filters"
    color="grey-5"
    outline
  >
    <q-menu
      anchor="top left"
      class="menu"
      self="top left"
      square
      transition-duration="0"
    >
      <q-list
        bordered
        padding
        style="width: 250px; max-width: 100vw;"
      >
        <q-item-label header>
          Sort By
        </q-item-label>

        <q-separator />

        <q-item
          v-for="(sorter, index) in sortList"
          :key="index"
          v-ripple
          dense
          tag="label"
        >
          <q-item-section avatar>
            <q-radio
              v-model="form.sort"
              :val="sorter.value"
              size="sm"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-4">
              {{ sorter.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { debounce } from 'quasar'
import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import { TagsParameters } from 'src/interfaces/tag'
import { defineComponent, PropType, reactive, watch } from 'vue'

const sortList = [
  {
    label: 'Recommended',
    value: 'recommended'
  },
  {
    label: 'Alphabetical',
    value: 'name'
  },
  {
    label: 'Items',
    value: 'items'
  }
]

export default defineComponent({
  name: 'TagsFilter',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup () {
    const { setParams: setModuleParams } = useRepository({ module: 'tags' })
    const { getParam: getModuleParam } = useRepositoryGetters('tags')

    const form = reactive<TagsParameters>({
      sort: getModuleParam('sort')
    })

    const performQuery = debounce(async (): Promise<void> => {
      await setModuleParams({
        params: { ...form, ...{ 'page[number]': 1 } },
        reset: true
      })
    }, 500)

    watch(form, performQuery)

    return {
      sortList,
      form
    }
  }
})
</script>

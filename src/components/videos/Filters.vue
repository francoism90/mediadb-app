<template>
  <q-btn
    icon="expand_more"
    label="Filters"
    color="grey-5"
    outline
  >
    <q-menu
      anchor="top left"
      self="top left"
      square
      class="menu"
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
            <q-item-label class="text-body2 text-grey-4">
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
import { VideosParameters } from 'src/interfaces/video'
import { defineComponent, PropType, reactive, watch } from 'vue'

const sortList = [
  {
    label: 'Recommended',
    value: 'recommended'
  },
  {
    label: 'Recently Added',
    value: 'created_at'
  },
  {
    label: 'Duration',
    value: 'duration'
  }
]

export default defineComponent({
  name: 'VideosFilter',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup () {
    const { setParams: setModuleParams } = useRepository({ module: 'videos' })
    const { getParam: getModuleParam } = useRepositoryGetters('videos')

    const form = reactive<VideosParameters>({
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

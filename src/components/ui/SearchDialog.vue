<template>
  <q-dialog
    ref="dialogRef"
    class="search"
    position="top"
    @hide="onDialogHide"
  >
    <q-card
      class="bg-transparent search-container q-dialog-plugin"
      flat
    >
      <q-card-section class="q-py-xs">
        <div class="text-caption text-grey-4 q-px-md">
          Search Videos
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model.trim="query"
          input-class="text-h3 q-px-md"
          debounce="750"
          autofocus
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar'
import useRepository from 'src/composables/useRepository'
import useRepositoryGetters from 'src/composables/useRepositoryGetters'
import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'SearchDialog',

  props: {
    route: {
      type: String as PropType<string>,
      required: true
    }
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup () {
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

    const { setParams: setModuleParams } = useRepository({ module: 'videos' })
    const { getParam: getModuleParam } = useRepositoryGetters('videos')

    const currentQuery = getModuleParam('filter[query]') as string
    const query = ref(currentQuery)

    watch(query, async (val: string) => {
      await setModuleParams({
        params: { 'filter[query]': val, 'page[number]': 1 },
        reset: true
      })
    })

    return {
      query,
      dialogRef,
      onDialogHide,
      onDialogCancel
    }
  }
})
</script>

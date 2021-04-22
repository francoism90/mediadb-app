<template>
  <q-btn
    dense
    flat
    round
    class="cursor-pointer"
    icon="search"
    aria-label="Search"
    @click="searchModal"
  />
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import SearchDialog from 'src/components/ui/SearchDialog.vue'
import useRouter from 'src/composables/useRouter'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppSearch',

  setup () {
    const $q = useQuasar()

    const { currentRouteName } = useRouter()

    const searchModal = (): void => {
      $q.dialog({
        component: SearchDialog,
        componentProps: {
          route: currentRouteName.value
        }
      })
    }

    return {
      searchModal
    }
  }
})
</script>

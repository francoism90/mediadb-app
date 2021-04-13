<template>
  <q-form
    v-if="visible"
    class="q-mx-md search"
    @submit.prevent
  >
    <q-input
      debounce="900"
      type="search"
      placeholder="Search videos"
      clearable
      square
      borderless
      class="bg-grey-11 search-query q-px-md"
      input-class="text-grey-1"
      hide-bottom-space
    >
      <template #prepend>
        <q-icon
          name="search"
          color="grey-5"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script lang="ts">
import { router } from 'src/router'
import { computed, defineComponent } from 'vue'

const searchable = [
  {
    placeholder: 'Search videos',
    route: { name: 'home' },
    store: 'videos'
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

    return {
      visible
    }
  }
})
</script>

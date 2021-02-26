<template>
 <q-form
    class="q-mx-md md-search"
    @submit.prevent
  >
    <q-input
      debounce="900"
      type="search"
      placeholder="Search"
      clearable
      square
      borderless
      class="md-search-q q-px-md"
      input-class="text-grey-1"
      hide-bottom-space
    >
      <template #prepend>
        <q-icon
          name="search"
          color="grey-5"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GlobalSearch'
})
</script>

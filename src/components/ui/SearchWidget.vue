<template>
  <q-input
    borderless
    hide-bottom-space
    class="search-widget"
    input-class="text-caption"
    placeholder="Search by name, tag, ..."
  >
    <template #prepend>
      <q-icon name="o_search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { useSession } from 'src/composables/useSession';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchWidget',

  setup() {
    const { store } = useSession();

    return {
      store,
    };
  },
});
</script>

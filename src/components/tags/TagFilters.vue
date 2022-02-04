<template>
  <q-input
    v-model.lazy="store.params.query"
    :debounce="350"
    autofocus
    borderless
    dense
    square
    hide-bottom-space
    placeholder="Enter a keyword..."
    class="input input-text tag-search full-width"
  >
    <template #append>
      <q-icon
        v-if="store.params.query"
        name="clear"
        class="cursor-pointer q-px-xs"
        @click.stop="store.params.query = null"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import { useTags } from 'src/composables/useTags';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TagFilters',

  setup() {
    const { store } = useTags();

    return {
      store,
    };
  },
});
</script>

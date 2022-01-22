<template>
  <div class="q-px-lg q-pt-lg">
    <q-input
      v-model.lazy="store.params.query"
      :dark="false"
      :debounce="350"
      borderless
      dense
      square
      hide-bottom-space
      placeholder="Enter a keyword..."
      class="tag-search-field q-px-sm full-width"
      input-class="tag-search-input"
    >
      <template #append>
        <q-icon
          v-if="store.params.query"
          name="clear"
          class="cursor-pointer q-px-xs"
          color="grey-6"
          @click.stop="store.params.query = null"
        />
      </template>
    </q-input>
  </div>
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

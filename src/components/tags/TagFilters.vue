<!-- <template>
  <q-input
    v-model.lazy="store.params.query"
    :debounce="350"
    autofocus
    borderless
    clearable
    clear-icon="close"
    dense
    square
    hide-bottom-space
    placeholder="Search Tags"
    class="input input-text tag-search full-width"
  >
    <template #prepend>
      <q-icon name="search" />
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
</script> -->

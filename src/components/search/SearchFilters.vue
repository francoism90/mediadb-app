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
    placeholder="Search Videos"
    class="input input-text search-input full-width"
  >
    <template #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { useSearch } from 'src/composables/useSearch';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchFilters',

  setup() {
    const { store } = useSearch();

    return {
      store,
    };
  },
});
</script> -->

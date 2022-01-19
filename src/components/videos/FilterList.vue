<template>
  <div class="filter-item-field">
    <h1>By List</h1>
    <p
      v-for="(item, index) in items"
      :key="index"
      :class="{ 'text-weight-bold': isActive(item.value) }"
      @click="toggle(item.value)"
    >
      {{ item.label }}
      <q-icon
        v-if="isActive(item.value)"
        name="close"
        size="16px"
      />
    </p>
  </div>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { computed, defineComponent } from 'vue';

const items = [
  { label: 'Bookmarks', value: 'favorites' },
  { label: 'Watchlist', value: 'following' },
  { label: 'History', value: 'viewed' },
];

export default defineComponent({
  name: 'FilterList',

  setup() {
    const { store } = useVideos();

    const active = computed(() => store.params.type);

    const isActive = (value: string | null) => value === active.value;

    const toggle = (value: string | null) => {
      if (isActive(value)) store.params.type = null;
      else store.params.type = value;
    };

    return {
      active,
      items,
      toggle,
      isActive,
    };
  },
});
</script>

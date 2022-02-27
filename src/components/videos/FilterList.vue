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
    const { reset, state } = useVideos();

    const active = computed(() => state.filters?.type);

    const isActive = (value: string | null) => value === active.value;

    const toggle = async (value: string | null) => reset({ type: isActive(value) ? null : value });

    return {
      toggle,
      isActive,
      active,
      items,
    };
  },
});
</script>

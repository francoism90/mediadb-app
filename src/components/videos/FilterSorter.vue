<template>
  <div class="filter-item-field">
    <h1>Sort By</h1>
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
  { label: 'Most Recent', value: 'created:desc' },
  { label: 'Most Viewed', value: 'views:desc' },
  { label: 'Longest', value: 'duration:desc' },
  { label: 'Shortest', value: 'duration:asc' },
];

export default defineComponent({
  name: 'FilterSorter',

  setup() {
    const { store } = useVideos();

    const active = computed(() => store.params.sort);

    const isActive = (value: string | null) => value === active.value;

    const toggle = (value: string | null) => {
      if (isActive(value)) store.params.sort = null;
      else store.params.sort = value;
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

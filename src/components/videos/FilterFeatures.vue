<template>
  <div class="filter-item-field">
    <h1>Features</h1>
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
  { label: '4K', value: '4k' },
  { label: 'HD', value: 'hd' },
  { label: 'Subtitles/CC', value: 'cc' },
  { label: 'VR', value: 'vr' },
  { label: '3D', value: '3d' },
  { label: 'HDR', value: 'hdr' },
];

export default defineComponent({
  name: 'FilterList',

  setup() {
    const { reset, state } = useVideos();

    const active = computed(() => state.filters?.features);

    const isActive = (value: string | null) => value === active.value;

    const toggle = async (value: string | null) => reset({ features: isActive(value) ? null : value });

    return {
      active,
      items,
      toggle,
      isActive,
    };
  },
});
</script>

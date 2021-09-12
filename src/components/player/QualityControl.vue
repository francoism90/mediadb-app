<template>
  <q-list
    v-for="(item, index) in bitrates"
    :key="index"
    bordered
    dense
  >
    <q-item
      v-close-popup
      clickable
    >
      <q-item-section>{{ item.label }}</q-item-section>

      <q-item-section side>
        <q-icon name="o_check" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import useDash from 'src/composables/useDash';
import useFilters from 'src/composables/useFilters';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'QualityControl',

  emits: ['setComponent'],

  setup() {
    const { store } = useDash();
    const { formatResolution } = useFilters();

    const bitrates = computed(() => store.properties.videoTracks?.map((x) => {
      const bitrate = x.bitrateList.find(Boolean);
      return formatResolution(bitrate?.height || 0, bitrate?.width || 0);
    }));

    const bitrate = computed(() => store.properties.videoTrack?.bitrateList.find(Boolean));

    const resolution = computed(() => formatResolution(
      bitrate.value?.height || 0,
      bitrate.value?.width || 0,
    ));

    return {
      store,
      bitrate,
      bitrates,
      resolution,
    };
  },
});
</script>

<template>
  <q-item>
    <q-item-section
      top
      class="text-grey-1 text-weight-medium video-details-label"
    >
      <slot name="label" />
    </q-item-section>

    <q-item-section
      top
      class="text-white block"
    >
      <slot />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoSection',
});
</script>

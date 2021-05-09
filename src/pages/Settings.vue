<template>
  <q-page class="row items-center justify-evenly" />
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsPage',

  setup() {
    useMeta(() => ({
      title: 'Settings',
    }));
  },
});
</script>

<template>
  <q-toolbar class="q-py-lg">
    <q-btn
      icon="filter_list"
      label="Filters"
      color="grey-5"
      outline
      @click="toggleDrawer"
    />
  </q-toolbar>
</template>

<script lang="ts">
import useDrawer from 'src/composables/useDrawer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoToolbar',

  setup() {
    const { toggleDrawer } = useDrawer();

    return {
      toggleDrawer,
    };
  },
});
</script>

<template>
  <q-btn
    icon="filter_list"
    label="Filters"
    color="grey-5"
    outline
  >
    <q-menu
      anchor="top left"
      class="menu"
      self="top left"
      square
      transition-duration="0"
    >
      <q-list
        bordered
        dense
        padding
        style="width: 250px; max-width: 100vw;"
      >
        <query />
        <q-separator spaced />
        <settings />
        <q-separator spaced />
        <sorters />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import Settings from 'src/components/videos/Settings.vue';
import Sorters from 'src/components/videos/Sorters.vue';
import Query from 'src/components/videos/Query.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoFilters',

  components: {
    Settings,
    Sorters,
    Query,
  },
});
</script>

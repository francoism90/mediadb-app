<template>
  <q-list
    bordered
    dense
    separator
    class="player-menu"
  >
    <!-- <q-item
      v-for="(item, index) in resolutions"
      :key="index"
      v-close-popup
      clickable
    >
      <q-item-section side>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>{{ item.label }}</q-item-section>

      <q-item-section side>
        <q-icon name="o_check" />
      </q-item-section>
    </q-item> -->
  </q-list>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QualityControl',

  emits: ['setComponent'],

  setup() {
    const { store } = usePlayer();

    return {
      store,
    };
  },
});
</script>

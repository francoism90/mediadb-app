<template>
  <q-scroll-area class="fit">
    <q-list padding>
      <type />
      <list />
      <reset />
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import useDrawer from 'src/composables/useDrawer';
import List from 'src/components/filters/List.vue';
import Reset from 'src/components/filters/Reset.vue';
import Type from 'src/components/filters/Type.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppDrawer',

  components: {
    Reset,
    List,
    Type,
  },

  setup() {
    const { toggleDrawer } = useDrawer();

    return {
      toggleDrawer,
    };
  },
});
</script>

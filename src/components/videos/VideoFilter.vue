<template>
  <q-toolbar class="q-pb-xl">
    <q-input
      v-model.lazy="store.params.query"
      :debounce="350"
      borderless
      square
      hide-bottom-space
      placeholder="Enter a keyword, tag, ..."
      class="video-search-field q-px-md full-width"
      input-class="video-search-input"
    >
      <template #append>
        <q-icon
          name="filter_list"
          class="cursor-pointer"
          color="grey-5"
        />
      </template>
    </q-input>
  </q-toolbar>
</template>

<script lang="ts">
import { useMeta, useQuasar } from 'quasar';
import { useVideos } from 'src/composables/useVideos';
import { defineAsyncComponent, defineComponent } from 'vue';

const filterComponent = defineAsyncComponent(() => import('components/videos/VideoFilters.vue'));

export default defineComponent({
  name: 'VideoFilter',

  setup() {
    const $q = useQuasar();
    const { store } = useVideos();

    const toggleFilters = (): void => {
      $q.dialog({
        component: filterComponent,
        componentProps: {
          maximized: true,
          position: 'right',
          transitionShow: 'slide-left',
          transitionHide: 'slide-right',
        },
      });
    };

    useMeta(() => ({ title: 'Videos' }));

    return {
      store,
      toggleFilters,
    };
  },
});
</script>

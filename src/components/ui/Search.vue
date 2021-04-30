<template>
  <q-btn
    v-if="searchConfig"
    dense
    flat
    round
    class="cursor-pointer"
    icon="search"
    aria-label="Search"
    @click="searchDialog"
  />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import SearchDialog from 'src/components/ui/SearchDialog.vue';
import useRouter from 'src/composables/useRouter';
import { computed, defineComponent } from 'vue';

const searchList = [
  {
    route: 'home',
    module: 'videos',
    label: 'Search Videos',
  },
  {
    route: 'tags',
    module: 'tags',
    label: 'Search Tags',
  },
];

export default defineComponent({
  name: 'AppSearch',

  setup() {
    const $q = useQuasar();

    const { currentRouteName } = useRouter();

    const searchConfig = computed(() => searchList.find((x) => x.route === currentRouteName.value));

    const searchDialog = (): void => {
      $q.dialog({
        component: SearchDialog,
        componentProps: searchConfig.value,
      });
    };

    return {
      searchConfig,
      searchDialog,
    };
  },
});
</script>

<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    right
    @click="onClick"
  />
</template>

<script lang="ts">
import useAcquaintances from 'src/composables/useAcquaintances';
import useVideo from 'src/composables/useVideo';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FavoriteControl',

  setup() {
    const { toggleFavorite } = useAcquaintances();
    const { store } = useVideo();

    const icon = computed(() => (store.data.favorite === true ? 'favorite' : 'favorite_border'));

    const onClick = async (): Promise<void> => toggleFavorite(store.data);

    return {
      onClick,
      store,
      icon,
    };
  },
});
</script>

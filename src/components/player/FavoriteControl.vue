<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    @click="onClick"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import useAcquaintances from 'src/composables/useAcquaintances';
import useVideo from 'src/composables/useVideo';

export default defineComponent({
  name: 'FavoriteControl',

  setup() {
    const { toggleFavorite } = useAcquaintances();
    const { store } = useVideo();

    const onClick = () => toggleFavorite(store.data);
    const icon = computed(() => (store.data.favorite === true ? 'favorite' : 'favorite_border'));

    return {
      onClick,
      store,
      icon,
    };
  },
});
</script>

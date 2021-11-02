<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    right
    tabindex="0"
    @click="onClick"
  />
</template>

<script lang="ts">
import { useAcquaintances } from 'src/composables/useAcquaintances';
import { useVideo } from 'src/composables/useVideo';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FavoriteControl',

  setup() {
    const { store } = useVideo();
    const { favorited } = useAcquaintances();

    const icon = computed(() => (store.data.favorite === true ? 'favorite' : 'favorite_border'));

    const onClick = async () => favorited(store.data);

    return {
      icon,
      onClick,
    };
  },
});
</script>

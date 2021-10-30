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
import useVideo from 'src/composables/useVideo';
import { Model } from 'src/interfaces/repository';
import { favorite } from 'src/repositories/user';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FavoriteControl',

  setup() {
    const { store } = useVideo();

    const icon = computed(() => (store.data.favorite === true ? 'favorite' : 'favorite_border'));

    const onClick = async (): Promise<Model> => favorite(store.data);

    return {
      onClick,
      store,
      icon,
    };
  },
});
</script>

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
import useVideo from 'src/composables/useVideo';
import { Model } from 'src/interfaces/repository';
import { follow } from 'src/repositories/user';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FollowControl',

  setup() {
    const { store } = useVideo();

    const icon = computed(() => (store.data.following === true ? 'watch_later' : 'o_watch_later'));

    const onClick = async (): Promise<Model> => follow(store.data);

    return {
      onClick,
      store,
      icon,
    };
  },
});
</script>

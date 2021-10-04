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
  name: 'FollowControl',

  setup() {
    const { toggleFollow } = useAcquaintances();
    const { store } = useVideo();

    const icon = computed(() => (store.data.following === true ? 'watch_later' : 'o_watch_later'));

    const onClick = async (): Promise<void> => toggleFollow(store.data);

    return {
      onClick,
      store,
      icon,
    };
  },
});
</script>

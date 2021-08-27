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
import useAcquaintances from 'src/composables/useAcquaintances';
import useVideo from 'src/composables/useVideo';
import { VideoModel } from 'src/interfaces/video';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FollowControl',

  setup() {
    const { toggleFollow } = useAcquaintances();
    const { store } = useVideo();

    const icon = computed(() => (store.data.following === true ? 'watch_later' : 'o_watch_later'));

    const onClick = async () => {
      const response = await toggleFollow(store.data);
      store.update(<VideoModel>response.data);
    };

    return {
      onClick,
      store,
      icon,
    };
  },
});
</script>

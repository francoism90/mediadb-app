<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    right
    tabindex="0"
    @click="following"
  />
</template>

<script lang="ts">
import { useAcquaintances } from 'src/composables/useAcquaintances';
import { useVideo } from 'src/composables/useVideo';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FollowControl',

  setup() {
    const { store } = useVideo();
    const { following } = useAcquaintances();

    const icon = computed(() => (store.data.following === true ? 'watch_later' : 'o_watch_later'));

    const onClick = async () => following(store.data);

    return {
      icon,
      onClick,
    };
  },
});
</script>

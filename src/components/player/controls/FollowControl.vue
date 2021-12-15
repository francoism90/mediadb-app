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
import { useVideo } from 'src/composables/useVideo';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FollowControl',

  setup() {
    const { store, follow } = useVideo();

    const icon = computed(() => (store.data?.following === true ? 'watch_later' : 'o_watch_later'));

    const onClick = async () => follow(store.data?.id || '');

    return {
      onClick,
      icon,
    };
  },
});
</script>

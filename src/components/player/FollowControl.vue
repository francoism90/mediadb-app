<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    @click="onSubmit"
  />
</template>

<script lang="ts">
import useAcquaintances from 'src/composables/useAcquaintances';
import usePlayer from 'src/composables/usePlayer';
import {
  computed, defineComponent, reactive,
} from 'vue';

export default defineComponent({
  name: 'FollowControl',

  setup() {
    const { store } = usePlayer();
    const { toggleFollow } = useAcquaintances();

    const icon = computed(() => (form.following === true ? 'watch_later' : 'o_watch_later'));

    const onSubmit = async (): Promise<void> => {
      const response = await follow(form);
      form.following = response.data?.following || false;
    };

    return {
      store,
      icon,
      onSubmit,
    };
  },
});
</script>

<template>
  <div class="player-navigation absolute-top-right q-py-md q-px-lg">
    <favorite-control />
    <follow-control />
    <action-control />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'ModelBar',

  components: {
    ActionControl: defineAsyncComponent(() => import('components/player/controls/ActionControl.vue')),
    FavoriteControl: defineAsyncComponent(() => import('components/player/controls/FavoriteControl.vue')),
    FollowControl: defineAsyncComponent(() => import('components/player/controls/FollowControl.vue')),
  },
});
</script>

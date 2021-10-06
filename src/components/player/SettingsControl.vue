<template>
  <div class="player-control player-settings absolute-top-right">
    <favorite-control />
    <follow-control />
    <action-control />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsControl',

  components: {
    ActionControl: defineAsyncComponent(() => import('components/player/ActionControl.vue')),
    FavoriteControl: defineAsyncComponent(() => import('components/player/FavoriteControl.vue')),
    FollowControl: defineAsyncComponent(() => import('components/player/FollowControl.vue')),
  },
});
</script>

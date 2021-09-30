<template>
  <div class="player-control player-settings absolute-top-right">
    <favorite-control />
    <follow-control />
    <action-control />
  </div>
</template>

<script lang="ts">
import ActionControl from 'src/components/player/ActionControl.vue';
import FavoriteControl from 'src/components/player/FavoriteControl.vue';
import FollowControl from 'src/components/player/FollowControl.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsControl',

  components: {
    ActionControl,
    FavoriteControl,
    FollowControl,
  },
});
</script>

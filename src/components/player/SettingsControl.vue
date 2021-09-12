<template>
  <div class="player-settings absolute-top-right">
    <favorite-control />
    <follow-control />
    <caption-control />
    <action-control />
  </div>
</template>

<script lang="ts">
import ActionControl from 'src/components/player/ActionControl.vue';
import CaptionControl from 'src/components/player/CaptionControl.vue';
import FavoriteControl from 'src/components/player/FavoriteControl.vue';
import FollowControl from 'src/components/player/FollowControl.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsControl',

  components: {
    ActionControl,
    CaptionControl,
    FavoriteControl,
    FollowControl,
  },
});
</script>

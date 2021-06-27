<template>
  <div class="absolute-top-right player-settings">
    <div class="q-col-gutter-md">
      <favorite-control />
      <caption-control />
      <model-control />
    </div>
  </div>
</template>

<script lang="ts">
import CaptionControl from 'src/components/player/CaptionControl.vue';
import FavoriteControl from 'src/components/player/FavoriteControl.vue';
import ModelControl from 'src/components/player/ModelControl.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsControl',

  components: {
    CaptionControl,
    FavoriteControl,
    ModelControl,
  },
});
</script>

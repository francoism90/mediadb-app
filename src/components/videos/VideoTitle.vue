<template>
  <div class="q-pb-sm text-h5 text-white ellipsis-2-lines">
    {{ video.title }}
  </div>

  <div class="q-gutter-md text-white">
    <q-chip
      :clickable="false"
      :ripple="false"
      color="transparent"
      text-color="grey-5"
      dense
      icon="visibility"
    >
      <span class="q-ml-xs text-caption">{{ video.views || 0 }} views</span>
    </q-chip>
  </div>
</template>

<script lang="ts">
import { VideoModel } from 'src/interfaces';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VideoTitle',

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },
});
</script>

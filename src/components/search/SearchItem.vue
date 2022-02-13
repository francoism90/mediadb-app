<template>
  <q-card
    class="search-item"
    draggable="false"
    flat
    square
  >
    <q-card-section horizontal>
      <div class="col q-pa-none">
        <div class="search-item-title ellipsis-2-lines">
          {{ model.title }}
        </div>

        <div class="search-item-meta">
          {{ duration }}
        </div>

        <div
          v-if="model.tags?.length"
          class="search-item-tags q-py-xs q-gutter-xs"
        >
          <q-chip
            v-for="tag in model.tags.slice(0, 5)"
            :key="tag.id"
            :label="tag.name"
            class="search-item-tag"
            clickable
            size="0.95em"
            dense
            square
          />

          <span v-if="model.tags.length >= 6">...</span>
        </div>
      </div>

      <div class="col-5 flex flex-center">
        <q-img
          :alt="model.title"
          :src="model.poster_url"
          :draggable="false"
          loading="lazy"
          img-class="search-item-img"
          class="search-item-thumb cursor-pointer"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { timeFormat } from 'src/helpers';
import { VideoModel } from 'src/interfaces';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SearchItem',

  props: {
    model: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const duration = computed(() => timeFormat(props.model.duration));

    return {
      duration,
    };
  },
});
</script>

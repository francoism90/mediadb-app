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
            v-for="tag in model.tags.slice(0, 3)"
            :key="tag.id"
            :label="tag.name"
            class="search-item-tag"
            clickable
            size="0.95em"
            dense
            square
            @click="filter(tag)"
          />

          <span v-if="model.tags.length >= 4">...</span>
        </div>
      </div>

      <router-link
        class="col-5"
        :to="{ name: 'video', params: { id: model.id, slug: model.slug } }"
      >
        <q-img
          :alt="model.title"
          :src="model.poster_url"
          :draggable="false"
          loading="lazy"
          img-class="search-item-img"
          class="search-item-thumb cursor-pointer"
        />
      </router-link>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { timeFormat } from 'src/helpers';
import { TagModel, VideoModel } from 'src/interfaces';
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
    const { reset } = useVideos();

    const duration = computed(() => timeFormat(props.model.duration));

    const filter = (tag: TagModel) => reset({ query: tag.name });

    return {
      filter,
      duration,
    };
  },
});
</script>

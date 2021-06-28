<template>
  <q-item
    v-ripple
    clickable
    class="no-padding tag-item"
    @click="onClick"
  >
    <q-item-section side>
      <q-avatar
        square
        color="grey-8"
        text-color="white"
        size="48px"
      >
        {{ tag.name.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="ellipsis">
        {{ tag.name }}
      </q-item-label>

      <q-item-label
        caption
        class="tag-item-description"
      >
        <span class="text-capitalize">{{ tag.type || 0 }}</span>
        <span class="q-px-sm">•</span>
        <span>{{ tag.items || 0 }} items</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import useRouter from 'src/composables/useRouter';
import useVideos from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces/tag';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TagsItem',

  props: {
    tag: {
      type: Object as PropType<TagModel>,
      required: true,
    },
  },

  setup(props) {
    const { store } = useVideos();
    const { router } = useRouter();

    const onClick = async () => {
      store.reset({
        filter: { tags: [props.tag.slug] },
        page: { number: 1 },
      });

      await router.push({ name: 'home' });
    };

    return {
      onClick,
    };
  },
});
</script>

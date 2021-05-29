<template>
  <q-page class="container">
    <q-toolbar class="q-py-lg">
      <filters module="tags" />
    </q-toolbar>

    <q-pull-to-refresh
      :key="id"
      @refresh="onRefresh"
    >
      <q-infinite-scroll @load="onLoad">
        <div class="row wrap justify-start items-start content-start q-col-gutter-lg">
          <q-intersection
            v-for="(item, index) in data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 tag-item"
          >
            <item :tag="item" />
          </q-intersection>
        </div>

        <template #loading>
          <div class="row no-wrap justify-center q-my-md">
            <q-spinner-orbit
              color="primary"
              size="3em"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import Filters from 'src/components/tags/Filters.vue';
import Item from 'src/components/tags/Item.vue';
import useTags from 'src/composables/useTags';
import { TagsParameters } from 'src/interfaces/tag';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TagsPage',

  components: {
    Item,
    Filters,
  },

  setup() {
    const {
      fetchTags, isLoadable, setParams, id, data,
    } = useTags({
      module: 'tags',
      params: <TagsParameters>{
        append: 'items',
        sort: 'name',
        'filter[type]': [],
        'page[number]': 1,
        'page[size]': 24,
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetchTags();
        await done(!isLoadable.value);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = async (done: Function): Promise<void> => {
      await setParams({
        params: { 'page[number]': 1 },
        reset: true,
      });

      done();
    };

    useMeta(() => ({
      title: 'Tags',
    }));

    return {
      onLoad,
      onRefresh,
      id,
      data,
    };
  },
});
</script>

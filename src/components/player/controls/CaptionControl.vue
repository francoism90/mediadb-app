<template>
  <q-list
    bordered
    dense
    separator
    class="player-menu"
  >
    <q-item
      v-for="(item, index) in store.properties?.textTracks"
      :key="index"
      v-close-popup
      clickable
    >
      <q-item-section>
        {{ language(item.lang || 'en') }}
      </q-item-section>

      <q-item-section side>
        <q-icon
          v-if="item.index === store.properties?.textTrack?.index"
          name="o_check"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { useIntl } from 'src/composables/useIntl';
import { usePlayer } from 'src/composables/usePlayer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CaptionControl',

  emits: ['setComponent'],

  setup() {
    const { intl } = useIntl();
    const { store } = usePlayer();

    const language = (value: string): string | undefined => intl?.formatDisplayName(value, { type: 'language' });

    return {
      language,
      store,
    };
  },
});
</script>

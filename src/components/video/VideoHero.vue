<!-- <template>
  <page-hero class="container q-mb-md">
    {{ title }}

    <template #meta>
      <span v-if="episode">{{ episode }}</span>
      <span>{{ duration }}</span>
      <span>{{ released }}</span>
    </template>
  </page-hero>
</template>

<script lang="ts">
import { useVideo } from 'src/composables/useVideo';
import { dateFormat, timeFormat } from 'src/helpers';
import { computed, defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoHero',

  components: {
    PageHero: defineAsyncComponent(() => import('components/ui/PageHero.vue')),
  },

  setup() {
    const { state } = useVideo();

    const title = computed(() => state.data?.title);
    const episode = computed(() => state.data?.production_code);
    const released = computed(() => dateFormat(state.data?.released_at || state.data?.created_at, 'YYYY'));
    const duration = computed(() => timeFormat(state.data?.duration));

    return {
      title,
      episode,
      released,
      duration,
    };
  },
});
</script> -->

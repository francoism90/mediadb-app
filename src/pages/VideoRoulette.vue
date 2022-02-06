<template>
  <q-page class="container">
    <template v-if="state.error">
      <q-banner class="container q-py-lg">
        <template #avatar>
          <q-icon
            name="error_outline"
            color="primary"
          />
        </template>

        <span class="text-body2">
          Unable to retrieve Video. An error occurred. ({{ state.error?.message || '500 - Server Error' }})
        </span>
      </q-banner>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useLoading } from 'src/composables/useLoading';
import { useRoulette } from 'src/composables/useRoulette';
import { router } from 'src/router';
import { check } from 'src/services/auth';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'VideoRoulette',

  async preFetch({ redirect, urlPath }) {
    const authenticated = await check({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ name: 'login' });
    }
  },

  setup() {
    const { state } = useLoading();
    const { initialize } = useRoulette();

    const redirect = async () => {
      const video = await initialize();

      await router.push({
        name: 'video',
        params: {
          id: video.data.id,
          slug: video.data.slug || '',
        },
      });
    };

    onMounted(() => redirect());

    return {
      state,
    };
  },
});
</script>

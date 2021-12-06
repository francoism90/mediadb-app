<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 15vh;">
        421
      </div>

      <div class="text-body1 text-grey-5">
        Oops. Please try again later..
      </div>

      <q-btn
        class="q-mt-xl"
        color="grey-10"
        text-color="primary"
        unelevated
        label="Go Back"
        no-caps
        @click="onClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RateLimited',

  setup() {
    const onClick = () => window.history.back();

    useMeta(() => ({ title: '421 - Rate Limit' }));

    return {
      onClick,
    };
  },
});
</script>

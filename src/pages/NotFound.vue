<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 15vh;">
        404
      </div>

      <div class="text-body1 text-grey-5">
        Oops. Nothing here..
      </div>

      <q-btn
        class="q-mt-xl"
        color="grey-10"
        text-color="primary"
        unelevated
        label="Go Home"
        no-caps
        to="/"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',

  setup() {
    useMeta(() => ({ title: '404 - Not Found' }));
  },
});
</script>

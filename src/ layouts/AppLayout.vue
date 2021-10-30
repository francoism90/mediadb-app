<template>
  <q-layout
    :key="sessionKey"
    view="hHh lpR fFf"
  >
    <q-header
      bordered
      class="header row no-wrap items-center content-center bg-dark"
      height-hint="58"
    >
      <q-toolbar class="header-container container fluid">
        <router-link
          to="/"
          class="text-body2 text-weight-bold text-grey-4"
        >
          MediaDB
        </router-link>

        <q-space />

        <q-tabs
          indicator-color="primary"
          content-class="header-tabs text-grey-5"
          left-icon="chevron_left"
          right-icon="chevron_right"
          inline-label
          stretch
        >
          <q-route-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :to="tab.route"
            :icon="tab.icon"
            :label="tab.label"
            exact
          />
        </q-tabs>

        <account />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import useDevice from 'src/App/composables/useDevice';
import useSession from 'src/App/composables/useSession';
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, watch } from 'vue';

const tabs = [
  {
    icon: 'o_ondemand_video',
    label: 'Ondemand',
    route: { name: 'home' },
  },
  {
    icon: 'o_tag',
    label: 'Tags',
    route: { name: 'tags' },
  },
];

export default defineComponent({
  name: 'BaseLayout',

  components: {
    Account: defineAsyncComponent(() => import('src/App/components/ui/Account.vue')),
  },

  setup() {
    const $q = useQuasar();
    const { subscribe, unsubscribe, store } = useSession();
    const { isUsable, onEnterFullScreen, onLeaveFullScreen } = useDevice();

    const sessionKey = computed(() => store.token || +new Date());

    onMounted(() => subscribe());
    onBeforeUnmount(() => unsubscribe());

    watch(() => $q.fullscreen.isActive, async (value): Promise<void> => {
      if (isUsable() && value === true) await onEnterFullScreen();
      if (isUsable() && value === false) await onLeaveFullScreen();
    });

    return {
      sessionKey,
      tabs,
    };
  },
});
</script>


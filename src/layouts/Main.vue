<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="md-header row items-center content-center no-wrap"
      height-hint="58"
    >
      <q-toolbar class="container fluid">
        <router-link
          :to="{ name: 'home' }"
          class="q-pr-xs text-weight-medium text-grey-5"
        >
            MediaDB
        </router-link>

        <q-space />

        <global-search />

        <div class="q-gutter-x-xs row no-wrap items-center">
          <q-btn
            flat
            dense
            icon="notifications"
            aria-label="Menu"
          />

          <q-btn
            flat
            dense
            icon="account_circle"
            aria-label="Menu"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalSearch from 'components/toolbar/GlobalSearch.vue'

export default defineComponent({
  name: 'Main',

  components: {
    GlobalSearch
  }
})
</script>

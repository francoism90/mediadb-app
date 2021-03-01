<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="md-header row items-center content-center no-wrap"
      height-hint="58"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
        />

        <global-search />

        <q-space />

        <div class="q-gutter-x-xs row no-wrap items-center">
          <q-btn
            flat
            dense
            icon="notifications"
            aria-label="Menu"
            @click="toggleDrawer"
          />

          <q-btn
            flat
            dense
            icon="account_circle"
            aria-label="Menu"
            @click="toggleDrawer"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      class="md-drawer"
    >
      <q-scroll-area class="md-drawer-container">
        <q-list>
          <q-item-label class="md-drawer-top">
            <span class="text-grey-5">MediaDB</span>
          </q-item-label>

          <navigation-link
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import NavigationLink from 'components/toolbar/NavigationLink.vue'
import GlobalSearch from 'components/toolbar/GlobalSearch.vue'

const linksList = [
  {
    title: 'Library',
    caption: 'quasar.dev',
    icon: 'video_library',
    link: { name: 'home' },
    exact: true
  },
  {
    title: 'Favorites',
    caption: 'Our API Docs',
    icon: 'favorite',
    link: { name: 'settings' }
  },
  {
    title: 'Watchlist',
    caption: 'Our API Docs',
    icon: 'bookmarks',
    link: { name: 'settings' }
  },
  {
    title: 'Tags',
    caption: 'Our API Docs',
    icon: 'school',
    link: { name: 'settings' }
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Main',

  components: {
    NavigationLink,
    GlobalSearch
  },

  setup () {
    const drawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      drawerOpen,
      toggleDrawer () {
        drawerOpen.value = !drawerOpen.value
      }
    }
  }
})
</script>

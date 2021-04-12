<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      bordered
      class="header row items-center content-center no-wrap"
      height-hint="58"
    >
      <q-toolbar class="header-container">
        <div class="row items-center content-center no-wrap">
          <q-icon
            name="o_menu"
            class="cursor-pointer q-mr-md"
            size="24px"
            aria-label="Account"
            @click="toggleDrawer"
          />

          <q-btn
            dense
            color="grey-10"
            icon="chevron_left"
            aria-label="Back"
          />

          <q-btn
            dense
            color="grey-10"
            icon="chevron_right"
            aria-label="Forward"
            class="q-ml-xs"
          />
        </div>

        <q-space />

        <q-form
          class="q-mx-md search"
          @submit.prevent
        >
          <q-input
            debounce="900"
            type="search"
            placeholder="Search"
            clearable
            square
            borderless
            class="bg-grey-11 search-query q-px-md"
            input-class="text-grey-1"
            hide-bottom-space
          >
            <template #prepend>
              <q-icon
                name="search"
                color="grey-5"
                class="cursor-pointer"
              />
            </template>

            <template #append>
              <q-icon
                name="filter_list"
                color="grey-5"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </q-form>

        <div class="row no-wrap items-center">
          <q-btn
            dense
            round
            color="grey-10"
            icon="account_circle"
            aria-label="Account"
            @click="toggleDrawer"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      behavior="mobile"
      class="drawer"
      bordered
      dark
      overlay
      :width="260"
    >
      <drawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Drawer from 'src/components/layout/Drawer.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Drawer
  },

  setup () {
    const drawer = ref(false)

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      toggleDrawer
    }
  }
})
</script>

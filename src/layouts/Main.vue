<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      bordered
      class="header row items-center content-center no-wrap"
      height-hint="58"
    >
      <q-toolbar class="q-px-md">
        <div class="q-gutter-x-xs row no-wrap items-center">
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
            class="search-q q-px-md"
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
      side="right"
      bordered
      overlay
      :width="250"
    >
      <q-scroll-area class="fit">
        <q-list>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

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

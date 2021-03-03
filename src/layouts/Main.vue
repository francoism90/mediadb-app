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

        <q-form
          class="q-mx-md md-search"
          @submit.prevent
        >
          <q-input
            debounce="900"
            type="search"
            placeholder="Search"
            clearable
            square
            borderless
            class="md-search-q q-px-md"
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

export default defineComponent({
  name: 'Main'
})
</script>

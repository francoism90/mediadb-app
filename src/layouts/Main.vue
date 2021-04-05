<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="md-header row items-center content-center no-wrap"
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

        <div class="row no-wrap items-center">
          <q-btn
            dense
            round
            color="grey-10"
            icon="account_circle"
            aria-label="Account"
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

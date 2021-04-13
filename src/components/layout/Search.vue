<template>
  <q-form
    class="q-mx-md search"
    @submit.prevent
  >
    <q-input
      debounce="900"
      type="search"
      placeholder="Search videos"
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
</template>

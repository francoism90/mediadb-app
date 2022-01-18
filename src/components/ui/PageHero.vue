<template>
  <div class="hero">
    <h1><span><slot name="main" /></span></h1>
    <p><slot name="footer" /></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHero',
});
</script>

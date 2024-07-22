<script setup lang="ts">
import NavBanner from '../components/NavBanner.vue';
import TranslateSteps from '../components/TranslateSteps.vue';
</script>

<template>
  <main>
    <NavBanner />
    <div class="flex-col p-4 text-left">
      <h2 class="m-2">Translation Assistant</h2>
      <TranslateSteps />
    </div>
  </main>
</template>

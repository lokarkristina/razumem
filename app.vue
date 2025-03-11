<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <PageHeader />

  <main>
    <UContainer :ui="{ constrained: 'max-w-5xl', padding: 'py-8 md:py-20' }">
      <NuxtPage />
    </UContainer>
  </main>

  <PageFooter />
</template>

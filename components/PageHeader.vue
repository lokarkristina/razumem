<script setup lang="ts">
import { getGradientColor } from '@/utils/getRandomColor'
</script>

<template>
  <header class="page-header bg-layout" :style="getGradientColor()">
    <UContainer :ui="{ constrained: 'max-w-6xl', padding: 'py-5' }">
      <div class="text-xs">
        <img src="@/public/logo.svg" />
      </div>
    </UContainer>
  </header>
</template>

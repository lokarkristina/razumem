<script setup lang="ts">
import { getGradientColor } from '@/utils/getRandomColor'
</script>

<template>
  <footer class="footer bg-layout" :style="getGradientColor()">
    <UContainer :ui="{ constrained: 'max-w-5xl', padding: 'py-10' }">
      <div class="text-xs footer-content text-end">
        <p>&copy; {{ new Date().getFullYear() }} kl. (:</p>
      </div>
    </UContainer>
  </footer>
</template>

<style>
.bg-layout {
  background-color: #e5e5f7;
  opacity: 0.65;
  background:
    linear-gradient(135deg, var(--color-back) 25%, transparent 25%) -24px 0/
      48px 48px,
    linear-gradient(225deg, var(--color-front) 25%, transparent 25%) -24px 0/
      48px 48px,
    linear-gradient(315deg, var(--color-back) 25%, transparent 25%) 0px 0/ 48px
      48px,
    linear-gradient(45deg, var(--color-front) 25%, #e5e5f7 25%) 0px 0/ 48px 48px;
}
</style>

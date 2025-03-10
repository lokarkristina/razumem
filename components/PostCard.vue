<script setup lang="ts">
import { formatSentences } from '@/utils/formatSentences'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const postText = computed(() => {
  return formatSentences(props.post.body).join(' ')
})
</script>

<template>
  <UCard
    :ui="{
      header: { padding: 'p-0' },
      body: { padding: 'sm:p-1 md:p-4' },
      footer: {},
    }"
  >
    <template #header>
      <img
        src="https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=cover"
        alt="Post Image"
        class="object-cover w-full h-32 rounded-t-lg"
      />
    </template>

    <div>
      <h3>
        {{ props.post.title }}
      </h3>
      {{ postText }}
    </div>

    <template #footer>
      <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
    </template>
  </UCard>
</template>

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

const postTitle = computed(() => {
  const firstChar = props.post.title.charAt(0).toUpperCase()
  const restOfTitle = props.post.title.slice(1)
  return `${firstChar} ${restOfTitle}`
})
</script>

<template>
  <UCard
    :ui="{
      base: 'grid grid-rows-[auto_1fr_auto] h-full',
      round: 'rounded-md',
      shadow: 'shadow-lg',
      hover: 'hover:shadow-xl',
      header: { padding: 'sm:p-0' },
      body: { padding: 'sm:p-1 md:p-3' },
      footer: {
        base: 'grid justify-end align-center mt-auto',
        padding: 'sm:p-4',
      },
    }"
  >
    <template #header>
      <img
        src="https://via.assets.so/album.png?id=1&q=95&w=400&h=400&fit=fill"
        alt="Post image"
        class="object-cover w-full h-32 rounded-t-lg"
      >
    </template>

    <div>
      <h3 class="mb-1 font-semibold text-lg/5 line-clamp-2 text-primary">
        {{ postTitle }}
      </h3>
      <p class="text-gray-500 text-sm/6 line-clamp-3">
        {{ postText }}
      </p>
    </div>

    <template #footer>
      <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
    </template>
  </UCard>
</template>

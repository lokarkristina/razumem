<script setup lang="ts">
import { formatSentences } from '@/utils/formatSentences'
import { useFetchComments } from '@/compostables/useFetchComments'
import { useFetchUsers } from '@/compostables/useFetchUsers'
import type { Post } from '@/types/Post'

const props = defineProps<{
  post: Post
}>()

const postAuthor = ref('')
const postComments = ref<number | null>(null)

// make the title look more like a real post
const postTitle = computed(() => {
  const firstChar = props.post.title.charAt(0).toUpperCase()
  const restOfTitle = props.post.title.slice(1)
  return `${firstChar} ${restOfTitle}`
})

// make the content look more like a real post
const postText = computed(() => {
  return formatSentences(props.post.body).join(' ')
})

onMounted(() => {
  const { comments } = useFetchComments(props.post.id)
  const { users } = useFetchUsers(props.post.userId)

  watchEffect(() => {
    if (comments.value) {
      postComments.value = comments.value.length
    }

    if (users.value) {
      // @todo something not ok with types yet
      postAuthor.value = users.value.name
    }
  })
})
</script>

<template>
  <UCard
    :ui="{
      base: 'grid grid-rows-[auto_1fr_auto] h-full cursor-pointer ring-0 transition-shadow hover:-translate-y-px',
      round: 'rounded-md',
      shadow: 'shadow-lg hover:shadow-2xl',
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
      />
    </template>

    <!-- post author -->
    <div
      v-if="postAuthor"
      class="flex items-center gap-1 p-0 mb-2 text-gray-300 text-xs/1"
    >
      <UIcon
        name="i-heroicons-user-circle"
        class="w-3 text-gray-400 aspect-square"
      />
      <span class="text-gray-400 text-[0.625rem]">
        {{ `${postAuthor} (id: ${props.post.userId})` }}
      </span>
    </div>

    <!-- post title and text -->
    <h3 class="mb-1 font-semibold text-lg/5 line-clamp-2 text-primary">
      {{ postTitle }}
    </h3>
    <p class="text-gray-500 text-sm/6 line-clamp-3">
      {{ postText }}
    </p>

    <template #footer>
      <div v-if="postComments" class="flex items-center gap-2">
        <!-- comments count -->
        <UIcon
          name="i-heroicons-chat-bubble-left-right"
          class="w-5 text-gray-400 aspect-square"
        />
        <span class="text-gray-400 text-sm/6">{{ postComments }}</span>
      </div>
    </template>
  </UCard>
</template>

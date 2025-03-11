<script setup lang="ts">
import { useFetchComments } from '@/compostables/useFetchComments'
import { useFetchUsers } from '@/compostables/useFetchUsers'
import type { Post } from '@/types/Post'
import { formatTitle, formatSentences } from '@/utils/formatText'
import { getGradientColor } from '@/utils/getRandomColor'

const props = defineProps<{
  post: Post
}>()

const postAuthor = ref('')
const postComments = ref<number | null>(null)

// make the title look more like a real post
const postTitle = computed(() => formatTitle(props.post.title))
// make the content look more like a real post
const postText = computed(() => formatSentences(props.post.body))

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
  <ULink :to="`/post/${props.post.id}`" class="text-start">
    <UCard
      :ui="{
        base: 'grid grid-rows-[auto_1fr_auto] h-full cursor-pointer ring-0 transition-[shadow_translate] hover:-translate-y-[8px] duration-250',
        round: 'rounded-md',
        shadow: 'shadow-lg hover:shadow-2xl',
        header: { padding: 'sm:p-0 p-0' },
        body: { padding: 'sm:p-2 md:p-3' },
        footer: {
          base: 'grid justify-end align-center mt-auto',
          padding: 'sm:p-2 md:p-4',
        },
      }"
    >
      <template #header>
        <div class="h-32 post-image" :style="getGradientColor()" />
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
        <span class="text-gray-400 text-[0.625rem] font-[Quicksand]">
          {{ `${postAuthor} (id: ${props.post.userId})` }}
        </span>
      </div>

      <!-- post title and text -->
      <h3
        class="mb-1 font-semibold text-lg/5 line-clamp-1 md:line-clamp-2 text-primary font-[Figtree]"
      >
        {{ postTitle }}
      </h3>
      <p class="text-gray-500 text-sm/6 line-clamp-3" v-html="postText" />

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
  </ULink>
</template>

<style>
/* used on other pages, placeholder for images */
.post-image {
  background-color: #e5e5f7;
  opacity: 0.7;
  background-image:
    linear-gradient(
      30deg,
      var(--color-front) 12%,
      transparent 12%,
      transparent 88%,
      var(--color-front) 88%,
      var(--color-front)
    ),
    linear-gradient(
      150deg,
      var(--color-front) 12%,
      transparent 12%,
      transparent 88%,
      var(--color-front) 88%,
      var(--color-front)
    ),
    linear-gradient(
      30deg,
      var(--color-front) 12%,
      transparent 12%,
      transparent 88%,
      var(--color-front) 88%,
      var(--color-front)
    ),
    linear-gradient(
      150deg,
      var(--color-front) 12%,
      transparent 12%,
      transparent 88%,
      var(--color-front) 88%,
      var(--color-front)
    ),
    linear-gradient(
      60deg,
      var(--color-back) 25%,
      transparent 25%,
      transparent 75%,
      var(--color-back) 75%,
      var(--color-back)
    ),
    linear-gradient(
      60deg,
      var(--color-back) 25%,
      transparent 25%,
      transparent 75%,
      var(--color-back) 75%,
      var(--color-back)
    );
  background-size: 28px 49px;
  background-position:
    0 0,
    0 0,
    14px 25px,
    14px 25px,
    0 0,
    14px 25px;
}
</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFetchPosts } from '@/compostables/useFetchPosts'
import { useFetchUsers } from '@/compostables/useFetchUsers'
import { useFetchComments } from '@/compostables/useFetchComments'
import type { Post } from '@/types/Post'
import type { User } from '@/types/User'
import type { Comment } from '@/types/Comment'
import { formatTitle, formatSentences } from '@/utils/formatText'
import { getRandomNumber } from '@/utils/randomNumber'
import { getGradientColor } from '@/utils/getRandomColor'

const route = useRoute()
const post = ref<Post>({} as Post)
const postAuthor = ref<User>({} as User)
const postComments = ref<Comment[]>([])

onMounted(() => {
  const { posts } = useFetchPosts(Number(route.params.id))
  const { comments } = useFetchComments(Number(route.params.id))
  // @todo should be able to get a single user from useFetchUsers
  const { users } = useFetchUsers()

  watchEffect(() => {
    if (posts.value) {
      // @todo type is not ok yet
      post.value = posts.value
    }

    if (comments.value) {
      postComments.value = comments.value
    }

    if (users.value && users.value.length > 0) {
      // Find the user that matches the post's userId
      const author = users.value.find((user) => +user.id === post.value.userId)
      if (author) {
        postAuthor.value = author
      }
    }
  })
})
</script>

<template>
  <div class="post">
    <!-- back button -->
    <UButton
      to="/"
      label="Back"
      variant="soft"
      icon="i-heroicons-backward"
      size="xs"
    />

    <div class="py-10 mt-4 rounded-md post-image" :style="getGradientColor()">
      <h1
        class="px-4 pt-5 pb-5 my-4 text-4xl font-bold bg-black/30 backdrop-blur-sm"
      >
        {{ formatTitle(post.title) }}
      </h1>
    </div>

    <!-- meta info - author, date -->
    <div
      class="flex items-center gap-3 py-5 text-sm text-gray-500 border-b border-dashed align-center"
    >
      <div v-if="postAuthor?.id" class="flex items-center gap-1">
        <UIcon
          name="i-heroicons-user-circle"
          class="w-6 text-gray-500 aspect-square"
        />
        <span>
          {{ postAuthor.name }}
        </span>
      </div>
      <UIcon
        name="i-heroicons-sparkles-solid"
        class="w-6 text-gray-800 aspect-square"
      />
      <div class="flex items-center gap-1">
        <UIcon
          name="i-heroicons-calendar"
          class="w-6 text-gray-500 aspect-square"
        />
        <span>
          {{ new Date().toLocaleDateString() }}
        </span>
      </div>
    </div>

    <!-- add to v-html so HTML in text strings is considered -->
    <!-- and makes the text looks more realistic -->
    <div class="grid gap-2 py-5" v-html="formatSentences(post.body)" />

    <!-- comments -->
    <div
      v-if="postComments?.length"
      class="grid gap-4 py-5 mt-10 border-t border-grey-100"
    >
      <h2 class="text-2xl text-primary">Comments</h2>

      <div
        v-for="comment in postComments"
        :key="comment.id"
        class="p-4 rounded-lg bg-gray-50"
      >
        <div
          class="grid grid-rows-[auto_auto] grid-cols-[auto_1fr] gap-x-2 items-center mb-2 text-sm text-gray-500"
        >
          <UAvatar
            :src="`https://avatars.githubusercontent.com/u/${getRandomNumber(6)}?v=4`"
            alt="Avatar"
            class="row-span-full col-1"
          />
          <div class="row-1 col-2">
            {{ formatTitle(comment.name) }}
          </div>
          <div class="col-2 row-2 text-[0.625rem]">
            {{ `@ ${comment.email}` }}
          </div>
        </div>
        <div>{{ comment.body }}</div>

        <!-- actions -->
        <!-- @todo add functionality -->
        <UButton
          label="Reply"
          trailing
          variant="link"
          color="teal"
          size="2xs"
          icon="i-heroicons-arrow-turn-down-left"
          class="flex mt-2 ms-auto"
        />
      </div>
    </div>
  </div>
</template>

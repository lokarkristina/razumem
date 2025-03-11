<script setup lang="ts">
import type { Post } from '@/types/Post'
import { useFetchPosts } from '~/compostables/useFetchPosts'

const postsList = ref<Post[] | []>([])
const waiting = ref<boolean>(true)
const page = ref<number>(1)
const postsPerPage: number = 10

const fetchPostsData = () => {
  const { posts, loading } = useFetchPosts()

  watchEffect(() => {
    if (posts.value) {
      postsList.value = posts.value as Post[]
      waiting.value = loading.value
    }
  })
}

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * postsPerPage
  const end = page.value * postsPerPage
  return postsList.value.slice(start, end)
})

onMounted(() => {
  fetchPostsData()
})
</script>

<template>
  <div>
    <h1 class="mb-10 text-3xl uppercase">Posts</h1>

    <!-- the skeleton loading, @todo move to component -->
    <template v-if="waiting">
      <div class="flex items-center space-x-4">
        <USkeleton class="w-12 h-12" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </template>

    <!-- list the posts -->
    <div v-else-if="postsList.length">
      <ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <li v-for="post in paginatedPosts" :key="post.id">
          <PostCard :post="post" />
        </li>
      </ul>

      <UPagination
        v-model="page"
        :total="postsList.length"
        :to="
          (page: number) => ({
            query: { page },
          })
        "
        :ui="{
          wrapper:
            'flex justify-center mt-10 py-10 shadow-none border-t border-grey-200',
          base: 'shadow-none ring-0 px-4 py-2',
          rounded: 'rounded-lg',
          padding: 'px-4 py-2',
        }"
        size="lg"
      />
    </div>

    <!-- no posts available -->
    <div v-else-if="!waiting && postsList.length === 0">
      <p>No posts available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/Post'
import { useFetchPosts } from '@/compostables/useFetchPosts'
import shuffleArray from '@/utils/shuffleArray'

const postsList = ref<Post[] | null>(null)
const waiting = ref<boolean>(true)
const page = ref<number>(1)
const postsPerPage: number = 10
const searchUser = ref<string>('')

const fetchPostsData = () => {
  const { posts, loading } = useFetchPosts()

  watchEffect(() => {
    if (posts.value) {
      postsList.value = posts.value as Post[]
      waiting.value = loading.value
    }
  })
}

const filteredPosts = computed(() => {
  // shuffle the posts, to prevent repeated data on the single page
  let filtered: Post[] = shuffleArray(postsList.value || [])

  if (searchUser.value) {
    filtered = filtered.filter(
      (post) => post.userId === Number(searchUser.value),
    )
  }
  const start = (page.value - 1) * postsPerPage
  const end = page.value * postsPerPage

  return filtered.slice(start, end)
})

// file-specific util
const hideInputNumbers = () => {
  return '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

onMounted(() => {
  fetchPostsData()
})
</script>

<template>
  <div class="post-list">
    <h1 class="mb-10 font-[Figtree] text-5xl uppercase">Posts</h1>

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
    <div v-else-if="postsList?.length">
      <!-- filters. -->
      <div class="max-w-xs mt-3 mb-10 post-list__filters">
        <UFormGroup label="Filter by user ID" class="grid gap-1 font-[Figtree]">
          <UInput
            v-model="searchUser"
            name="searchUser"
            icon="i-heroicons-user-circle"
            autocomplete="off"
            type="number"
            :ui="{
              base: `${hideInputNumbers()}`,
              icon: { trailing: { pointer: '' } },
            }"
          >
            <template #trailing>
              <UButton
                v-show="searchUser !== ''"
                color="gray"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="searchUser = ''"
              />
            </template>
          </UInput>
        </UFormGroup>
      </div>

      <!-- @todo improvments -->
      <!-- - maybe all on which page are you at the top -->
      <!-- - list the number of items maybe -->
      <!-- - indicate how many posts are filtered -->

      <ul
        v-if="filteredPosts.length > 0"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <li v-for="post in filteredPosts" :key="post.id">
          <PostCard :post="post" />
        </li>
      </ul>

      <!-- @todo if you're not on first page, and you filter the posts,
      the filtering will not work, because the page is not reset to 1 -->
      <UPagination
        v-if="postsList.length > postsPerPage && filteredPosts.length > 0"
        v-model="page"
        :total="postsList?.length || 0"
        :to="
          (page: number) => ({
            query: { page },
          })
        "
        size="lg"
        variant="ghost"
        :ui="{
          wrapper:
            'flex justify-center mt-10 py-10 shadow-none border-t border-grey-200 ',
          base: 'shadow-none ring-0 px-4 py-2',
          rounded: 'rounded-lg dark:rounded-xs',
          padding: 'px-4 py-2',
        }"
      />

      <!-- no posts available -->
      <div
        v-else-if="!waiting && filteredPosts.length === 0"
        class="grid gap-4 place-items-start"
      >
        <iframe
          src="https://giphy.com/embed/vfr5N7WNpTb75esG3i"
          class="pointer-events-none"
          width="200"
          height="200"
          frameborder="0"
        />
        <p>No posts available.</p>
      </div>
    </div>
  </div>
</template>

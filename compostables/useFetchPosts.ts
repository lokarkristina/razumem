import type { Post } from '@/types/Post'
import API_URL from '@/utils/constants'

// @todo maybe Nuxt compostable can be used instead?
// https://nuxt.com/docs/api/composables/use-fetch

export function useFetchPosts(id?: number) {
  const posts: Ref<Post[]> = ref([])
  const loading = ref(true)
  const error = ref<Error | null>(null)

  const fetchPosts = async () => {
    loading.value = true
    error.value = null

    try {
      const url = id ? `${API_URL}/posts/${id}` : `${API_URL}/posts`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }
      posts.value = await response.json()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  fetchPosts()

  return {
    posts,
    loading, // @todo handle loading
    error, // @todo handle error
  }
}

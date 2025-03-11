import type { Post } from '@/types/Post'
import API_URL from '@/utils/constants'

export function useFetchPosts() {
  const posts = ref<Post[] | null>(null)
  const loading = ref(true)
  const error = ref<Error | null>(null)

  const fetchPosts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/posts`)
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
    loading, // @todo add loading state
    error, // @todo add error handling
    fetchPosts,
  }
}

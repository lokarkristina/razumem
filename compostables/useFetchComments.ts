import type { Comment } from '@/types/Comment'
import API_URL from '@/utils/constants'

export function useFetchComments(postId?: number) {
  const comments: Ref<Comment[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchComments = async () => {
    loading.value = true
    error.value = null

    try {
      const url =
        postId && postId > 0
          ? `${API_URL}/posts/${postId}/comments`
          : `${API_URL}/comments`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }
      const data = await response.json()
      comments.value = data
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch comments'
    } finally {
      loading.value = false
    }
  }

  fetchComments()

  return {
    comments,
    loading, // @todo add loading state
    error, // @todo add error handling
    fetchComments,
  }
}

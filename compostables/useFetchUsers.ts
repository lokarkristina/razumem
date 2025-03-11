import type { User } from '@/types/User'
import API_URL from '@/utils/constants'

export function useFetchUsers(id?: number) {
  const users: Ref<User[]> = ref([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchAuthor = async () => {
    loading.value = true

    try {
      const response = await fetch(
        id && id > 0 ? `${API_URL}/users/${id}` : `${API_URL}/users`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch author')
      }
      users.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  fetchAuthor()

  return {
    users,
    loading,
    error,
    fetchAuthor,
  }
}

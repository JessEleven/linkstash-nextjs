import { authClient } from '@/libs/auth-client'

export const getLinkboxes = async () => {
  try {
    const response = await fetch('/api/linkbox', {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user links')
    }
    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'An unknown error occurred')
    }
    return result.data
  } catch (error) {
    console.error('Error fetching user linkboxes:', error)
    return []
  }
}

export const createLinkbox = async (formData) => {
  try {
    const { data } = await authClient.getSession()
    const authUserId = data?.user?.id

    if (!authUserId) {
      throw new Error('User is not authenticated')
    }
    const response = await fetch('/api/linkbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        userId: authUserId
      })
    })
    const result = await response.json()

    return result
  } catch (error) {
    console.error('Unexpected error:', error)
    throw error
  }
}

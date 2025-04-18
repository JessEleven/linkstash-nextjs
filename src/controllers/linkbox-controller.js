import { authClient } from '@/libs/auth-client'

export const getLinkboxes = async (sortBy) => {
  try {
    const response = await fetch(`/api/linkbox?sortBy=${sortBy}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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

export const softDeleteLinkbox = async ({ id, onSuccess }) => {
  try {
    const response = await fetch('/api/linkbox', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id })
    })
    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Can not delete from the trash')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    // console.error('Error fetching user trash links:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

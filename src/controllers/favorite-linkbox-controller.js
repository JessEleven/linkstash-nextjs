export const getFavoriteLinkboxes = async () => {
  try {
    const response = await fetch('/api/favorite-linkbox', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user favorite links')
    }
    const result = await response.json()

    console.log(result)
    if (!result.success) {
      throw new Error(result.error || 'An unknown error occurred')
    }
    return result.data
  } catch (error) {
    console.error('Error fetching user links:', error)
    return []
  }
}

export const toggleFavorite = async ({ id, favorite, onSuccess }) => {
  try {
    const response = await fetch('/api/favorite-linkbox', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id, favorite: !favorite })
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to toggle favorite')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    // console.error('Error fetching user links:', error)
    return { success: false, error: error.message }
  }
}

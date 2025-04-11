export const getTrashedLinkboxes = async () => {
  try {
    const response = await fetch('/api/trash-linkbox', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user trash links')
    }
    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'An unknown error occurred')
    }
    return result.data
  } catch (error) {
    console.error('Error fetching user trash links:', error)
    return []
  }
}

export const restoreLinkbox = async ({ id, onSuccess }) => {
  try {
    const response = await fetch('/api/trash-linkbox', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id })
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Can not restore from the trash')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    // console.error('Error fetching user trash links:', error)
    return { success: false, error: error.message }
  }
}

export const deleteLinkbox = async ({ id, onSuccess }) => {
  try {
    const response = await fetch('/api/trash-linkbox', {
      method: 'DELETE',
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

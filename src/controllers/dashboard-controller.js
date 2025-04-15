export const getDashboard = async () => {
  try {
    const response = await fetch('/api/dashboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to recover data from the dashboard')
    }
    const result = await response.json()

    console.log({ res: result })
    if (!result.success) {
      throw new Error(result.error || 'An unknown error occurred')
    }
    return result
  } catch (error) {
    console.error('Failed to get dashboard data:', error)
    return {
      success: false,
      message: 'Failed to get dashboard data'
    }
  }
}

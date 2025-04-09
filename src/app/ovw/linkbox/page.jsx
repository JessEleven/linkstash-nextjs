'use client'

import GetLinkboxes from '../components-ovw/get-linkboxes'
import UserOptions from '../components-ovw/user-options'
import { useEffect, useState } from 'react'

export default function LinkkoxPage () {
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [layout, setLayout] = useState('grid')

  useEffect(() => {
    const storeLayout = localStorage.getItem('layout')
    if (storeLayout) {
      setLayout(storeLayout)
    }
  }, [])

  const handleRefresh = () => {
    setRefreshFlag(prev => !prev)
  }

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout)
    localStorage.setItem('layout', newLayout)
  }

  return (
    <>
      <UserOptions
        onRefresh={handleRefresh}
        onLayoutChange={handleLayoutChange}
        isRefreshing={isRefreshing}
      />
      <GetLinkboxes
        refresh={refreshFlag}
        layout={layout}
        isRefreshing={setIsRefreshing}
      />
    </>
  )
}

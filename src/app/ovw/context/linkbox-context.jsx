/* eslint-disable no-undef */
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CreateLinkboxContext = createContext()

export const LinkboxContext = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [layout, setLayout] = useState('grid')
  const [sortBy, setSortBy] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sortBy') || 'name'
    }
    return 'name'
  })

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy)
    localStorage.setItem('sortBy', newSortBy)
  }

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
    <CreateLinkboxContext.Provider
      value={{
        refreshFlag,
        isRefreshing,
        layout,
        sortBy,
        handleRefresh,
        handleLayoutChange,
        setIsRefreshing,
        handleSortChange
      }}
    >
      {children}
    </CreateLinkboxContext.Provider>
  )
}
export const useLinkboxContext = () => useContext(CreateLinkboxContext)

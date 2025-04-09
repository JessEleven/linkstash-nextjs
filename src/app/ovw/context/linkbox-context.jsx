'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CreateLinkboxContext = createContext()

export const LinkboxContext = ({ children }) => {
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
    <CreateLinkboxContext.Provider
      value={{
        refreshFlag,
        isRefreshing,
        layout,
        handleRefresh,
        handleLayoutChange,
        setIsRefreshing
      }}
    >
      {children}
    </CreateLinkboxContext.Provider>
  )
}
export const useLinkboxContext = () => useContext(CreateLinkboxContext)

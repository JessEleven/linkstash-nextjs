'use client'

import GetLinkboxes from '../components-ovw/get-linkboxes'
import UserOptions from '../components-ovw/user-options'
import { useLinkboxContext } from '@/app/ovw/context/linkbox-context'

export default function FavoritePage () {
  const {
    refreshFlag,
    isRefreshing,
    layout,
    sortBy,
    handleRefresh,
    handleLayoutChange,
    setIsRefreshing,
    handleSortChange
  } = useLinkboxContext()

  return (
    <>
      <UserOptions
        onRefresh={handleRefresh}
        sortBy={sortBy}
        onLayoutChange={handleLayoutChange}
        isRefreshing={isRefreshing}
        handleSortChange={handleSortChange}
      />
      <GetLinkboxes
        refresh={refreshFlag}
        layout={layout}
        sortBy={sortBy}
        isRefreshing={setIsRefreshing}
      />
    </>
  )
}

'use client'

import GetLinkboxes from '../components-ovw/get-linkboxes'
import UserOptions from '../components-ovw/user-options'
import { useLinkboxContext } from '../context/linkbox-context'

export default function LinkkoxPage () {
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
        isRefreshing={isRefreshing}
        sortBy={sortBy}
        onRefresh={handleRefresh}
        onLayoutChange={handleLayoutChange}
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

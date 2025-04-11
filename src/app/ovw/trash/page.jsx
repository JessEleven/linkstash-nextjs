'use client'

import GetLinkboxes from '../components-ovw/get-linkboxes'
import UserOptions from '../components-ovw/user-options'
import { useLinkboxContext } from '../context/linkbox-context'

export default function TrashPage () {
  const {
    refreshFlag,
    isRefreshing,
    layout,
    handleRefresh,
    handleLayoutChange,
    setIsRefreshing
  } = useLinkboxContext()

  return (
    <>
      <UserOptions
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onLayoutChange={handleLayoutChange}
      />
      <GetLinkboxes
        refresh={refreshFlag}
        layout={layout}
        isRefreshing={setIsRefreshing}
      />
    </>
  )
}

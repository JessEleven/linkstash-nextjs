'use client'

import GetLinkboxes from '../components-ovw/get-linkboxes'
import UserOptions from '../components-ovw/user-options'
import { useLinkboxContext } from '../context/linkbox-context'

export default function LinkkoxPage () {
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

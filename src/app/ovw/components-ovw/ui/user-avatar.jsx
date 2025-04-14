import { auth } from '@/libs/auth'
import Avvvatars from 'avvvatars-react'
import { headers } from 'next/headers'

function getInitials (name) {
  if (!name) return 'N/A'
  const parts = name.trim().split(' ')

  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default async function UserAvatar () {
  const { user } = await auth.api.getSession({
    headers: await headers()
  })
  const initials = getInitials(user?.name)

  return (
    <div className='flex items-center justify-center size-8 rounded-[5px] bg-neutral-200/85'>
      {user?.image
        ? <img src={user?.image} alt='N/A' />
        : <div className='text-sm font-medium text-neutral-900'><Avvvatars value={initials} /></div>}
    </div>
  )
}

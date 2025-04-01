import SignOut from '@/components/UI/sign-out'
import { auth } from '@/libs/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page () {
  const authSession = await auth.api.getSession({
    headers: await headers()
  })

  if (!authSession) {
    redirect('/sign-up')
  }
  const user = authSession?.user
  const session = authSession?.session

  const formatDate = (dateString) => {
    const date = new Date(dateString || '')
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <div className='space-y-2 text-sm font-normal'>
      <li>
        Name: {user?.name}
      </li>
      <li>
        Email: {user?.email}
      </li>
      <li>
        Session expires at: {formatDate(session?.expiresAt)}
      </li>
      <SignOut />
    </div>
  )
}

import { auth } from '@/libs/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function handleSignOut () {
  'use server'
  await auth.api.signOut({
    headers: await headers()
  })
  redirect('/sign-in')
}

export default function SignOut () {
  return (
    <form action={handleSignOut}>
      <button type='submit' className='btn-border cursor-pointer'>Sign Out</button>
    </form>
  )
}

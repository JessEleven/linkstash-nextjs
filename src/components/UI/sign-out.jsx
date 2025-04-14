import { auth } from '@/libs/auth'
import clsx from 'clsx'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function handleSignOut () {
  'use server'
  await auth.api.signOut({
    headers: await headers()
  })
  redirect('/sign-in')
}

export default async function SignOut ({ icon, text, onText }) {
  const classes = clsx({
    'ovw-border p-[7px]': icon && !text,
    'ovw-btn-hover py-[9px]': text && !icon,
    'flex items-center gap-x-1.5 ovw-btn-hover': icon && onText
  })

  return (
    <form action={handleSignOut}>
      <button type='submit' className={`${classes} cursor-pointer font-medium`}>
        {icon}
        {icon && <span>{onText}</span>}
        {text}
      </button>
    </form>
  )
}

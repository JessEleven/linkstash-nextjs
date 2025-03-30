'use client'

import AppLogo from '@/components/UI/app-logo'
import { authClient } from '@/libs/auth-client'
import { EyeIcon, EyeOffIcon } from '@/resources/assets/auth-icons'
import { LoaderIcon } from '@/resources/assets/global-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function SignUpPage () {
  const [isPending, startTransition] = useTransition()
  const [isHide, setIsHide] = useState(true)
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  })
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    startTransition(async () => {
      await authClient.signUp.email(formData, {
        onRequest: () => {
          console.log('Request sent...')
        },
        onSuccess: async () => {
          console.log('Sign up successful!')
          router.push('/dashboard')
        },
        onError: (ctx) => {
          console.log('Error:', ctx)
        }
      })
    })
  }

  return (
    <main className='flex place-content-center'>
      <div className='flex items-center justify-center h-screen w-full md:w-[372px] mx-7 md:mx-0'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 text-sm w-full'>
          <Link translate='no' href='/' className='flex items-center justify-center gap-x-1.5'>
            <AppLogo />
          </Link>
          <h3 className='text-base'>Create a new account</h3>
          <div className='flex flex-col'>
            <label htmlFor='name' className='mb-1.5'>Name</label>
            <input
              id='name'
              type='text'
              name='name'
              placeholder='e.g. Jhon Doe'
              className='input'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-1.5'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='you@example.com'
              className='input'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='mb-1.5'>Password</label>
            <div className='relative flex items-center text-neutral-500 focus-within:text-slate-500'>
              <input
                id='password'
                type={isHide ? 'password' : 'text'}
                name='password'
                placeholder='••••••••'
                className='input w-full text-neutral-50'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type='button' aria-label='View password' className='absolute right-4 cursor-pointer' onClick={() => setIsHide(!isHide)}>
                {isHide ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>
          <button type='submit' className='btn-session flex items-center justify-center gap-x-0.5'>
            {isPending ? <><LoaderIcon className='size-5 animate-spin' /> <span>Signing Up...</span> </> : 'Sign Up'}
          </button>
        </form>
      </div>
    </main>
  )
}

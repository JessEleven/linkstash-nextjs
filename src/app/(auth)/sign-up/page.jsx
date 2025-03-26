import AppLogo from '@/components/app-logo'
import Link from 'next/link'

export default function SignUpPage () {
  return (
    <main className='flex place-content-center'>
      <div className='flex items-center justify-center h-screen w-full md:w-[372px] mx-7 md:mx-0'>
        <form action='' className='flex flex-col space-y-4 text-sm w-full'>
          <Link translate='no' href='/' className='flex items-center justify-center gap-x-1.5'>
            <AppLogo />
          </Link>
          <h3 className='text-base'>Create a new account</h3>
          <div className='flex flex-col'>
            <label htmlFor='' className='mb-1.5'>Username</label>
            <input
              type='text'
              placeholder='e.g. jesscool'
              className='input'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='' className='mb-1.5'>Email</label>
            <input
              type='email'
              placeholder='you@example.com'
              className='input'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='' className='mb-1.5'>Password</label>
            <input
              type='password'
              placeholder='••••••••'
              className='input'
            />
          </div>
          <button className='button'>
            Sign Up
          </button>
        </form>
      </div>
    </main>
  )
}

import { GitHubIcon, HelpIcon } from '@/resources/assets/nav-icons'
import AppLogo from './UI/app-logo'
import Link from 'next/link'
import SignOut from './UI/sign-out'
import { auth } from '@/libs/auth'
import { headers } from 'next/headers'

export default async function Nav () {
  let session = null

  try {
    session = await auth.api.getSession({
      headers: await headers()
    })
  } catch (error) {
    console.error('Error fetching session:', error)
  }

  return (
    <header className='my-4'>
      <div className='flex items-center justify-between'>
        <Link translate='no' href='/'>
          <AppLogo />
        </Link>

        <nav>
          <ul className='hidden md:flex md:items-center md:gap-x-2 list-none'>
            <li>
              <Link href='#' aria-label='About' className='hover-icon block'>
                <HelpIcon className='size-4' />
              </Link>
            </li>

            <li>
              <a
                className='hover-icon block'
                href='https://github.com/JessEleven/linkstash-nextjs'
                rel='noreferrer'
                target='_blank'
                aria-label='GitHub repository'
              >
                <GitHubIcon className='size-4' />
              </a>
            </li>

            {session
              ? (
                <>
                  <li>
                    <Link href='/ovw' className='btn-bg block'>
                      Overview
                    </Link>
                  </li>
                  <li>
                    <SignOut text='Sign Out' />
                  </li>
                </>
                )
              : (
                <>
                  <li>
                    <Link href='/sign-in' className='btn-bg block'>
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href='/sign-up' className='btn-bg block'>
                      Sign Up
                    </Link>
                  </li>
                </>
                )}
          </ul>
        </nav>

        <div className='block md:hidden'>
          ❌
        </div>
      </div>
    </header>
  )
}

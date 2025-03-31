import { GitHubIcon, HelpIcon } from '@/resources/assets/nav-icons'
import AppLogo from './UI/app-logo'
import Link from 'next/link'
import SignOut from './UI/sign-out'
import { auth } from '@/libs/auth'
import { headers } from 'next/headers'

export default async function Nav () {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <header className='my-4'>
      <div className='flex items-center justify-between'>
        <Link translate='no' href='/'>
          <AppLogo />
        </Link>

        <nav>
          <ul className='hidden md:flex md:items-center md:gap-x-2 list-none'>
            <li>
              <div className='hover-icon'>
                <Link href='#' aria-label='About'>
                  <HelpIcon className='size-4' />
                </Link>
              </div>
            </li>

            <li>
              <div className='hover-icon'>
                <a
                  href='https://github.com/JessEleven/linkstash-nextjs'
                  rel='noreferrer'
                  target='_blank'
                  aria-label='GitHub repository'
                >
                  <GitHubIcon className='size-4' />
                </a>
              </div>
            </li>

            {session
              ? (
                <>
                  <li>
                    <Link href='/overview' className='btn-bg'>
                      Dashborad
                    </Link>
                  </li>
                  <li>
                    <SignOut />
                  </li>
                </>
                )
              : (
                <>
                  <li>
                    <Link href='/sign-in' className='btn-bg'>
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href='/sign-up' className='btn-border'>
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

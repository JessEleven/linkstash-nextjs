import AppLogo from '@/components/UI/app-logo'
import Link from 'next/link'
import HeaderNav from './ui/header-nav'
import UserAvatar from './ui/user-avatar'
import SignOut from '@/components/UI/sign-out'
import GetSessionStatus from '@/components/UI/get-session-status'
import { LogoutIcon } from '../resources/assets/home-nav-icons'

export default function HomeNav () {
  return (
    <>
      <header className='h-16 flex items-center justify-between'>
        <Link translate='no' href='/'>
          <AppLogo />
        </Link>

        <div className='flex items-center gap-x-2'>
          <GetSessionStatus />
          <SignOut icon={<LogoutIcon />} />
          <UserAvatar />
        </div>
      </header>
      <HeaderNav />
    </>
  )
}

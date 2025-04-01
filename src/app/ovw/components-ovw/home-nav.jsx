import AppLogo from '@/components/UI/app-logo'
import Link from 'next/link'
import HeaderNav from './ui/header-nav'

export default function HomeNav () {
  return (
    <>
      <header className='h-14 flex items-center justify-between'>
        <Link translate='no' href='/'>
          <AppLogo />
        </Link>

        <div className='flex items-center justify-center size-8 rounded-full border border-neutral-500'>
          <h3 className='text-sm font-medium'>JJ</h3>
        </div>
      </header>
      <HeaderNav />
    </>
  )
}

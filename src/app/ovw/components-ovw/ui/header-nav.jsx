'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BoxIcon,
  DashboardIcon
} from '../../resources/assets/home-nav-icons'
import { StarIcon } from '../../resources/assets/linkboxes-icons'

const routes = [
  {
    title: 'Overview',
    icon: <DashboardIcon />,
    path: '/ovw'
  },
  {
    title: 'Linkbox',
    icon: <BoxIcon />,
    path: '/ovw/linkbox'
  },
  {
    title: 'Favorite',
    icon: <StarIcon className='size-4' />,
    path: '/ovw/favorite'
  }
]

export default function HomeNav () {
  const pathname = usePathname()

  return (
    <div className='text-sm font-normal leading-3.5'>
      <nav className='flex justify-center'>
        <ul className='flex items-center gap-x-5 list-none px-4 py-[7px] border border-neutral-500 rounded-[5px] overflow-x-auto'>
          {routes?.map((route) => (
            <li key={route.title}>
              <Link href={route.path} className='flex items-center gap-x-1 hover:text-teal-500 transition-colors duration-200 ease-in-out'>
                <span className={`${pathname === route.path && 'text-teal-500'}`}>{route.icon}</span>
                <span className='text-neutral-50'>{route.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='border-b border-b-neutral-500 w-full mt-2' />
    </div>
  )
}

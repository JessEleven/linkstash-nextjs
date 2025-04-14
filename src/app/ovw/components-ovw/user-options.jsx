'use client'

import Link from 'next/link'
import {
  CheckIcon,
  ChevronDownIcon,
  LayoutGridIcon,
  LayoutListIcon,
  PlusIcon,
  RefreshIcon,
  TextRecognitionIcon,
  WorldIcon
} from '../resources/assets/user-optiones-icons'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LoaderIcon } from '@/resources/assets/global-icons'

export const options = [
  { id: 'name', label: 'Sort by name', icon: <TextRecognitionIcon /> },
  { id: 'visits', label: 'Sort by visits', icon: <WorldIcon /> }
]

export default function UserOptions ({ isRefreshing, sortBy, onRefresh, onLayoutChange, handleSortChange }) {
  const [open, setOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const pathname = usePathname()
  // console.log({ sorted_by: sortBy })

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <div className='mt-5 block md:flex items-center justify-between gap-x-2.5 text-sm font-normal leading-3.5'>
      <form className='w-full lg:w-[470px] xl:w-[456px] 2xl:w-[440px]'>
        <input
          type='search'
          className='w-full input'
        />
      </form>

      <div className='flex items-center justify-between gap-x-2.5 mt-5 md:mt-0'>
        {pathname !== '/ovw/trash' && (
          <div className='relative w-full md:w-44'>
            <button
              type='button'
              onClick={() => setOpen(!open)}
              className='ovw-border flex items-center justify-between w-full px-4 py-[7px] cursor-pointer'
            >
              <span className='flex items-center gap-1'>
                {hasMounted
                  ? (sortBy === 'name'
                      ? <>Sort by name <TextRecognitionIcon /></>
                      : <>Sort by visits <WorldIcon /></>)
                  : <><LoaderIcon className='size-4 animate-spin' /> One moment</>}
              </span> <ChevronDownIcon />
            </button>

            {open && (
              <article className='absolute z-40 ovw-border flex flex-col w-full top-11 px-4 py-2 bg-[#2b2c32]'>
                {options.map((op) => (
                  <button
                    key={op.id}
                    type='button' onClick={() => {
                      handleSortChange(op.id === 'name' ? 'name' : 'visits')
                      setOpen(false)
                    }}
                    className='flex items-center justify-between gap-x-1 py-1 cursor-pointer'
                  >
                    <span className='flex items-center gap-x-1'>
                      {op.label} {op.icon}
                    </span>
                    {op.id === sortBy && <CheckIcon className='text-teal-500' />}
                  </button>
                ))}
              </article>
            )}
          </div>
        )}

        <button
          type='button'
          aria-label='Layout grid icon'
          className='ovw-border p-[7px] cursor-pointer'
          onClick={() => onLayoutChange('grid')}
        >
          <LayoutGridIcon />
        </button>

        <button
          type='button'
          aria-label='Layout list icon'
          className='ovw-border p-[7px] cursor-pointer'
          onClick={() => onLayoutChange('list')}
        >
          <LayoutListIcon />
        </button>

        <button
          type='button'
          aria-label='Refresh'
          className='ovw-border p-[7px] cursor-pointer'
          onClick={onRefresh}
        >
          <RefreshIcon className={`${isRefreshing && 'animate-spin'}`} />
        </button>

        {pathname === '/ovw/linkbox' && (
          <Link href='/ovw/linkbox/new' className='ovw-btn-hover flex items-center gap-x-1 py-2'>
            <PlusIcon /> <span className='hidden md:flex font-medium'>Add linkbox</span>
          </Link>
        )}
      </div>
    </div>
  )
}

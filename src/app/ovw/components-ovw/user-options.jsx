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
import { useState } from 'react'

export const options = [
  { label: 'Sort by name', icon: <TextRecognitionIcon /> },
  { label: 'Sort by visits', icon: <WorldIcon /> }
]

export default function UserOptions ({ onRefresh, onLayoutChange, isRefreshing }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(options[0].label)

  const selectedOp = options.find(opt => opt.label === value) || options[0]

  return (
    <div className='mt-5 block md:flex items-center justify-between gap-x-2.5 text-sm font-normal leading-3.5'>
      <form className='w-full lg:w-[470px] xl:w-[456px] 2xl:w-[440px]'>
        <input
          type='search'
          className='w-full input'
        />
      </form>

      <div className='flex items-center justify-between gap-x-2.5 mt-5 md:mt-0'>
        <div className='relative w-full md:w-44'>
          <button
            type='button'
            onClick={() => setOpen(!open)}
            className='ovw-border flex items-center justify-between w-full px-4 py-[7px] cursor-pointer'
          >
            <span className='flex items-center gap-1'>{selectedOp.label} {selectedOp.icon}</span> <ChevronDownIcon />
          </button>

          {open && (
            <article className='absolute z-40 ovw-border flex flex-col w-full top-11 px-4 py-2 bg-[#2b2c32]'>
              {options.map((op) => (
                <button
                  key={op.label}
                  type='button' onClick={() => {
                    setValue(op.label)
                    setOpen(false)
                  }}
                  className='flex items-center justify-between gap-x-1 py-1 cursor-pointer'
                >
                  <span className='flex items-center gap-x-1'>
                    {op.label} {op.icon}
                  </span>
                  {op.label === value && <CheckIcon className='text-teal-500' />}
                </button>
              ))}
            </article>
          )}
        </div>

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

        <Link href='/ovw/linkbox/new' className='flex items-center gap-x-1 rounded-[5px] text-neutral-900 bg-neutral-200 px-4 py-2'>
          <PlusIcon /> <span className='hidden md:flex'>Add linkox</span>
        </Link>
      </div>
    </div>
  )
}

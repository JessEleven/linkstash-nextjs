'use client'

import Link from 'next/link'
import {
  CheckIcon,
  ChevronDownIcon,
  LayoutGridIcon,
  LayoutListIcon,
  PlusIcon,
  TextRecognitionIcon,
  WorldIcon
} from '../resources/assets/user-optiones-icons'
import { useState } from 'react'

export const options = [
  { label: 'Sort by activity', icon: <WorldIcon /> },
  { label: 'Sort by name', icon: <TextRecognitionIcon /> }
]

export default function UserOptions () {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(options[0].label)

  const selectedOp = options.find(opt => opt.label === value) || options[0]

  return (
    <section className='mt-5 flex items-center justify-between text-sm font-normal leading-3.5'>
      <form className=''>
        <div className=''>
          <input
            type='search'
            className='w-[500px] input'
          />
        </div>
      </form>

      <div className='flex items-center justify-between gap-x-3'>
        <div className='relative w-48'>
          <button
            type='button'
            onClick={() => setOpen(!open)}
            className='ovw-border flex items-center justify-between w-full px-4 py-[7px] cursor-pointer'
          >
            <span className='flex items-center gap-x-1'>{selectedOp.label} {selectedOp.icon}</span> <ChevronDownIcon />
          </button>

          {open && (
            <article className='absolute ovw-border flex flex-col w-full top-11 px-4 py-2'>
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

        <button type='button' aria-label='Layout grid icon' className='ovw-border p-[7px] cursor-pointer'>
          <LayoutGridIcon />
        </button>

        <button type='button' aria-label='Layout list icon' className='ovw-border p-[7px] cursor-pointer'>
          <LayoutListIcon />
        </button>

        <Link href='/ovw/linkbox/new' className='flex items-center gap-x-1 rounded-[5px] text-neutral-900 bg-neutral-200 px-4 py-2'>
          <PlusIcon /> <span>Add link</span>
        </Link>
      </div>
    </section>
  )
}

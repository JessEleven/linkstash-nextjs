'use client'

import { createLinkbox } from '@/controllers/linkbox-controller'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { linkboxSchema } from '@/libs/validators/linkbox-schema'

export default function NewPage () {
  const [serverError, setServerError] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(linkboxSchema),
    mode: 'onChange'
  })
  // const router = useRouter()

  const onSubmit = async (formData) => {
    try {
      setServerError(null)
      const result = await createLinkbox(formData)

      if (!result.success) {
        setServerError(result.error)
        return
      }
      reset()
      // router.push('/ovw/linkbox/new')
    } catch (error) {
      console.error('Unexpected error:', error)
      setServerError('An unexpected error occurred. Please try again')
    }
  }

  return (
    <main className='mt-4 flex place-content-center'>
      <div className='flex flex-col justify-center mt-10 w-full md:w-[372px] mx-5 md:mx-0'>
        <h2 className='text-2xl font-medium mb-5'>Save a new linkbox</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col text-sm font-normal w-full'>
          <div className='flex flex-col relative'>
            <label htmlFor='linkName' className='mb-1.5'>Name</label>
            <input
              id='linkName'
              type='text'
              name='linkName'
              placeholder='e.g. tailwindcss'
              className='input'
              {...register('linkName', {
                onChange: () => setServerError(null)
              })}
            />
            {errors.linkName && <p className='text-red-500/85 absolute top-[65px]'>{errors.linkName.message}</p>}
            {serverError && <p className='text-red-500/85'>{serverError}</p>}
          </div>

          <div className='flex flex-col relative mt-[25px]'>
            <label htmlFor='originalUrl' className='mb-1.5'>URL</label>
            <input
              id='originalUrl'
              type='text'
              name='originalUrl'
              placeholder='e.g. https://tailwindcss.com/'
              className='input'
              {...register('originalUrl')}
            />
            {errors.originalUrl && <p className='text-red-500/85 absolute top-[65px]'>{errors.originalUrl.message}</p>}
          </div>

          <div className='flex gap-x-5 mt-7'>
            <Link
              href='/ovw/linkbox'
              className='w-full text-center mt-3 font-medium py-1.5 rounded-[5px] transition-colors ease-in-out
              duration-200 border border-neutral-500 hover:bg-neutral-700/50'
            >
              Cancel
            </Link>
            <button type='submit' className='btn-session w-full text-center'>
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

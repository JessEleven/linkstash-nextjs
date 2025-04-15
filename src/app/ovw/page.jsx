'use client'

import { getDashboard } from '@/controllers/dashboard-controller'
import { useEffect, useState } from 'react'
import { BoxIcon } from './resources/assets/home-nav-icons'
import { EyeIcon, StarIcon, TrashIcon } from './resources/assets/linkboxes-icons'

export default function OvwPage () {
  const [data, setData] = useState({
    total_links: 0,
    total_active_links: 0,
    total_favorites: 0,
    total_trash: 0,
    total_visits: 0,
    total_active_visits: 0,
    total_favorites_visits: 0,
    total_trash_visited: 0
  })

  useEffect(() => {
    (async () => {
      const result = await getDashboard()
      setData(result)
    })()
  }, [])

  return (
    <main className='mt-5'>
      <h2 className='mb-5 font-medium text-lg text-neutral-400'>
        Welcome to the monitoring dashboard
      </h2>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5'>
        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-blue-100'>
              <BoxIcon className='size-5 md:size-6 text-blue-400' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>All linkboxes</h3>
              <p className='ovw-text-dash'>{data?.total_links}</p>
            </div>
          </div>
        </article>

        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-emerald-100'>
              <BoxIcon className='size-5 md:size-6 text-emerald-500' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>Active linkboxes</h3>
              <p className='ovw-text-dash'>{data?.total_active_links}</p>
            </div>
          </div>
        </article>

        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-yellow-100'>
              <StarIcon className='size-5 md:size-6 text-yellow-500' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>Favorites</h3>
              <p className='ovw-text-dash'>{data?.total_favorites}</p>
            </div>
          </div>
        </article>

        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-red-100'>
              <TrashIcon className='size-5 md:size-6 text-red-500' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>All trash</h3>
              <p className='ovw-text-dash'>{data?.total_trash}</p>
            </div>
          </div>
        </article>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-2.5 md:my-5'>
        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-orange-100'>
              <EyeIcon className='size-6 text-orange-400' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>All visits</h3>
              <p className='ovw-text-dash'>{data?.total_visits}</p>
            </div>
          </div>
        </article>

        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-orange-100'>
              <EyeIcon className='size-6 text-orange-400' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>All active visits</h3>
              <p className='ovw-text-dash'>{data?.total_active_visits}</p>
            </div>
          </div>
        </article>

        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-orange-100'>
              <EyeIcon className='size-6 text-orange-400' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>All favorites visits</h3>
              <p className='ovw-text-dash'>{data?.total_favorites_visits}</p>
            </div>
          </div>
        </article>

        <article className='ovw-dash-card'>
          <div className='flex items-center gap-x-2.5'>
            <div className='ovw-dash-icon text-orange-100'>
              <EyeIcon className='size-6 text-orange-400' />
            </div>
            <div>
              <h3 className='text-neutral-400 text-sm'>All trash visited</h3>
              <p className='ovw-text-dash'>{data?.total_trash_visited}</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

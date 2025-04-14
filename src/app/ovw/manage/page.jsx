import { auth } from '@/libs/auth'
import moment from 'moment'
import { headers } from 'next/headers'
import { CalendarIcon, ShieldCheckIcon } from '../resources/assets/linkboxes-icons'
import ListSessions from './list-sessions'

export default async function ManagePage () {
  const { session } = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <main className='flex justify-center mt-5 mb-10'>
      <div className='w-[650px]'>
        <div className='flex items-center gap-x-1'>
          <ShieldCheckIcon />
          <h2 className='text-2xl font-medium'>Security</h2>
        </div>

        <article className='mt-5 p-5 border border-neutral-500 rounded-lg'>
          <h3 className='text-lg'>About the session</h3>
          <div className='block text-sm'>
            <div className='flex items-center gap-x-1'>
              <CalendarIcon />
              <p>Created at {moment(session?.createdAt).format('lll')}</p>
            </div>
            <div className='flex items-center gap-x-1'>
              <CalendarIcon />
              <p>Expires at {moment(session?.expiresAt).format('lll')}</p>
            </div>
          </div>
        </article>

        <div className='mt-5 p-5 border border-neutral-500 rounded-lg'>
          <h3 className='text-lg'>Active devices</h3>
          <ListSessions />
        </div>
      </div>

    </main>
  )
}

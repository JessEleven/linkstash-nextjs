import { db } from '@/db/drizzle'
import { linkbox } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function ShortcodePage ({ params }) {
  const { shortcode } = params

  const [url] = await db.select()
    .from(linkbox)
    .where(eq(linkbox.shortUrl, shortcode))
    .limit(1)

  if (!url) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <Image
          width={40}
          height={40}
          src='/logo.svg'
          alt='Logo'
          priority
        />
        <h2 className='text-2xl font-medium mt-1.5'>Link doesn't exist</h2>
        <p className='font-normal'>Verify that the link is correct</p>
      </div>
    )
  }

  await db.update(linkbox)
    .set({ visits: url.visits + 1 })
    .where(eq(linkbox.shortUrl, shortcode))

  redirect(url.originalUrl)
}

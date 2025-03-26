import Image from 'next/image'
import Logo from '../../public/logo.svg'

export default function Home () {
  return (
    <main className='flex items-center justify-center mt-7 gap-x-1.5'>
      <Image src={Logo} className='size-6 md:size-7' />
      <h1 className='text-center text-xl md:text-2xl font-medium'>LinkStash</h1>
    </main>
  )
}

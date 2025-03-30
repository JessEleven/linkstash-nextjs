import Image from 'next/image'
import Logo from '../../../public/logo.svg'

export default function AppLogo () {
  return (
    <div className='flex items-center gap-x-1.5'>
      <Image
        src={Logo}
        alt='Linkstash'
        className='size-6 md:size-7'
        priority
      />
      <h3 className='text-center text-xl md:text-2xl font-medium'>Linkstash</h3>
    </div>
  )
}

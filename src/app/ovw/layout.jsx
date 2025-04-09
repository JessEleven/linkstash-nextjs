import { LinkboxContext } from '@/app/ovw/context/linkbox-context'
import HomeNav from './components-ovw/home-nav'

export default async function HomeLayout ({ children }) {
  return (
    <div className='mx-5 md:mx-8 2xl:mx-64'>
      <HomeNav />
      <LinkboxContext>
        {children}
      </LinkboxContext>
    </div>
  )
}

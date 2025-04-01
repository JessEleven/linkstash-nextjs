import HomeNav from './components-ovw/home-nav'

export default async function HomeLayout ({ children }) {
  return (
    <div className='mx-5 md:mx-8'>
      <HomeNav />
      {children}
    </div>
  )
}

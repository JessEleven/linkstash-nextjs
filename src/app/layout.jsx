import { Roboto } from 'next/font/google'
import '@/resources/css/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap'
})

export const metadata = {
  title: 'LinkStash',
  icons: [{ rel: 'icon', url: '/logo.svg' }],
  description: 'LinkStash created with next.js'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} bg-[#25272e] text-neutral-50`}>
        {children}
      </body>
    </html>
  )
}

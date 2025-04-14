import { Roboto } from 'next/font/google'
import '../resources/css/globals.css'
import { Toaster } from 'sonner'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap'
})

export const metadata = {
  title: 'Linkstash',
  icons: [{ rel: 'icon', url: '/logo.svg' }],
  description: 'Linkstash created with next.js'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${roboto.className} bg-[#25272e] text-neutral-50 tracking-wide`}>
        <Toaster position='bottom-right' expand={false} />
        {children}
      </body>
    </html>
  )
}

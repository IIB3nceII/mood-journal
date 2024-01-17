import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Providers from '@providers'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mood diary'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout

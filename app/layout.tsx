import Providers from '@providers'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import LayoutProps from '@/app/types/layout.model'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mood Journal'
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout

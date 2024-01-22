'use client'

import { Container } from '@common'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/home'
  },
  {
    label: 'Mental Wellbeing',
    href: '/mental-wellbeing'
  }
]

const Header = () => (
  <header className="fixed left-0 top-0 z-50 flex w-full bg-white py-2 shadow-md md:py-4">
    <Container>
      <div className="flex items-center justify-between">
        <nav>
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href }, i) => (
              <li key={i}>
                <Link className="rounded-md px-3 py-2 hover:bg-slate-100 hover:bg-opacity-75" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </Container>
  </header>
)

export default Header

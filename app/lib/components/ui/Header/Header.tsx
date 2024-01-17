'use client'

import { Container } from '@common'
import { signOut } from 'next-auth/react'

const Header = () => (
  <header className="fixed left-0 top-0 z-50 flex w-full bg-white py-2 shadow-md md:py-4">
    <Container>
      <button onClick={() => signOut()}>Logout</button>
    </Container>
  </header>
)

export default Header

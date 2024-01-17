'use client'

import { Container } from '@common'
import { signOut } from 'next-auth/react'

const UserHomePage = () => {
  return (
    <main>
      <Container>
        <p>Journals</p>
      </Container>
    </main>
  )
}

export default UserHomePage

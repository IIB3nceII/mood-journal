import React, { ReactNode } from 'react'
import { Header } from '@components'

type ProtectedLayoutProps = { children: ReactNode | ReactNode[] }

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => (
  <>
    <Header />
    {children}
  </>
)

export default ProtectedLayout

import React, { ReactNode } from 'react'
import { Header } from '@components'
import LayoutProps from '@/types/layout.model'

const ProtectedLayout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
  </>
)

export default ProtectedLayout

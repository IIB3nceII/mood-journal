import React, { ReactNode } from 'react'
import { Header, ShareModal } from '@components'
import LayoutProps from '@/app/types/layout.model'

const ProtectedLayout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}

    <ShareModal />
  </>
)

export default ProtectedLayout

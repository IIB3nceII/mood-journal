'use client'

import { ReactNode } from 'react'
import ReactQueryProvider from './react-query'
import ToasterProvider from './toaster'

type ProviderProps = { children: ReactNode | ReactNode[] }

const Providers = ({ children }: ProviderProps) => (
  <ReactQueryProvider>
    <ToasterProvider>{children}</ToasterProvider>
  </ReactQueryProvider>
)

export default Providers

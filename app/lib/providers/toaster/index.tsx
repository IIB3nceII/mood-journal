import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

type ToasterProviderProps = { children: ReactNode }

const ToasterProvider = ({ children }: ToasterProviderProps) => (
  <>
    {children}
    <Toaster />
  </>
)

export default ToasterProvider

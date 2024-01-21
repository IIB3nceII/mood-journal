import { getCurrentUser } from '@/actions'
import LayoutProps from '../types/layout.model'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: LayoutProps) => {
  const user = await getCurrentUser()

  if (user) redirect('/home')

  return <>{children}</>
}

export default AuthLayout

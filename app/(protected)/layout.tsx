import LayoutProps from '@/app/types/layout.model'
import { Header, ShareModal } from '@components'

const ProtectedLayout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}

    <ShareModal />
  </>
)

export default ProtectedLayout

import LayoutProps from '@/app/types/layout.model'
import { Header, MessagingModal, ShareModal } from '@components'

const ProtectedLayout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}

    <ShareModal />
    <MessagingModal />
  </>
)

export default ProtectedLayout

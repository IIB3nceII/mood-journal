import LayoutProps from '@/app/types/layout.model'
import { ChatGPTMessagingModal, Header, MessagingModal, ShareModal } from '@components'

const ProtectedLayout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}

    <ShareModal />
    <MessagingModal />
    <ChatGPTMessagingModal />
  </>
)

export default ProtectedLayout

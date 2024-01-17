import LayoutProps from '@/types/layout.model'
import { Container } from '@common'
import Sidebar from './Sidebar'

const JournalLayout = ({ children }: LayoutProps) => (
  <main className="h-screen">
    <Container>
      <div className="flex h-full gap-3">
        <Sidebar />
        <div className="flex h-full w-3/4">{children}</div>
      </div>
    </Container>
  </main>
)

export default JournalLayout

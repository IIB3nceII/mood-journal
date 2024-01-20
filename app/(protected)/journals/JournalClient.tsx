'use client'

import { Container } from '@common'
import Sidebar from './Sidebar'
import ContentEdit from './ContentEdit'
import Journal from '@/app/types/entities/journal.model'

type JournalClientProps = {
  journal: Partial<Journal>
}

const JournalClient = ({ journal }: JournalClientProps) => {
  return (
    <main className="h-screen">
      <Container>
        <div className="flex h-full gap-3">
          <Sidebar />
          <div className="flex h-full w-3/4">
            <ContentEdit />
          </div>
        </div>
      </Container>
    </main>
  )
}

export default JournalClient

'use client'

import Doc from '@/app/types/entities/doc.model'
import Journal from '@/app/types/entities/journal.model'
import { Container } from '@common'
import { useAutosave } from '@hooks'
import { editDoc, editJournal } from '@utils'
import { useEffect, useState } from 'react'
import ContentEdit from './ContentEdit'
import Sidebar from './Sidebar'

type JournalClientProps = {
  journal: Partial<Journal>
}

const JournalClient = ({ journal }: JournalClientProps) => {
  const [selectedJournal, setSelectedJournal] = useState<Partial<Journal>>(journal)
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(journal.docs?.length ? journal?.docs[0] : null)

  // useAutosave(() => onSaveDoc(), 60 * 1000, [selectedDoc])

  useEffect(() => console.log(selectedDoc), [selectedDoc])

  const onJournalTitleChange = (value: string): void => {
    if (!selectedJournal) return
    setSelectedJournal({ ...selectedJournal, title: value })
  }

  const onEditJournal = (value: string): void => {
    if (!selectedJournal || selectedJournal.title?.trim() === value.trim()) return
    editJournal({ ...selectedJournal, title: value.trim() })
  }

  const onEditDocTitle = (value: string): void => {
    if (!selectedDoc) return
    setSelectedDoc({ ...selectedDoc, title: value })
  }

  const onEditDocContent = (value: string): void => {
    if (!selectedDoc) return
    setSelectedDoc({ ...selectedDoc, content: value })
  }

  const onSaveDoc = (): void => {
    if (!selectedDoc) return
    editDoc(selectedDoc)
  }

  return (
    <main className="h-screen">
      <Container>
        <div className="flex h-full gap-3">
          <Sidebar title={selectedJournal.title} onTitleChange={onJournalTitleChange} items={journal.docs} onTitleBlur={onEditJournal} />
          <div className="flex h-full w-2/3">
            <ContentEdit
              item={selectedDoc}
              onTitleChange={onEditDocTitle}
              onContentChange={onEditDocContent}
              onTitleBlur={onSaveDoc}
              onContentBlur={onSaveDoc}
            />
          </div>
        </div>
      </Container>
    </main>
  )
}

export default JournalClient

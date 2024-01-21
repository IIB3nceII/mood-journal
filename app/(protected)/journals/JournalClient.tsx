'use client'

import Doc from '@/app/types/entities/doc.model'
import Journal from '@/app/types/entities/journal.model'
import { Button, Container } from '@common'
import { useAutosave, useShareModal } from '@hooks'
import { editDoc, editJournal } from '@utils'
import { useState } from 'react'
import ContentEdit from './ContentEdit'
import Sidebar from './Sidebar'

const SAVE_TRIGGER_COUNT = 50

type JournalClientProps = {
  journal: Partial<Journal>
}

const JournalClient = ({ journal }: JournalClientProps) => {
  const { isOpen, onOpen, onClose } = useShareModal()
  const [sidebarItems, setSidebarItems] = useState<Doc[]>(journal.docs || [])
  const [selectedJournal, setSelectedJournal] = useState<Partial<Journal>>(journal)
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(journal.docs?.length ? journal?.docs[0] : null)

  let changeCount = 0

  // TODO: Uncomment
  useAutosave(
    () => {
      if (!selectedDoc) return

      if (changeCount === SAVE_TRIGGER_COUNT) {
        // onSaveDoc()
        changeCount = 0
      } else {
        changeCount++
      }
    },
    60 * 1000,
    [selectedDoc]
  )

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
    setSidebarItems(sidebarItems.map((doc) => (doc.id === selectedDoc.id ? { ...doc, title: value } : doc)))
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
          <Sidebar title={selectedJournal.title} onTitleChange={onJournalTitleChange} items={sidebarItems} onTitleBlur={onEditJournal} />
          <div className="flex h-full w-2/3">
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-end">
                <div>
                  <Button label="Share" onClick={onOpen} />
                </div>
              </div>
              <ContentEdit
                item={selectedDoc}
                onTitleChange={onEditDocTitle}
                onContentChange={onEditDocContent}
                onTitleBlur={onSaveDoc}
                onContentBlur={onSaveDoc}
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default JournalClient

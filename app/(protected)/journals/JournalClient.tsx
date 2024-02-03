'use client'

import Doc from '@/app/types/entities/doc.model'
import Journal from '@/app/types/entities/journal.model'
import { Container } from '@common'
import { useAutosave, useShareModal } from '@hooks'
import { editDoc, editJournal } from '@utils'
import { useEffect, useMemo, useState } from 'react'
import ContentEdit from './ContentEdit'
import Sidebar from './Sidebar'
import User from '@/app/types/entities/user.model'

const SAVE_TRIGGER_COUNT = 50

type JournalClientProps = {
  user: Partial<User>
  journal: Partial<Journal>
}

const JournalClient = ({ user, journal }: JournalClientProps) => {
  const { onChangeJournalPublicId, onSetSharedWithIDs } = useShareModal()
  const [sidebarItems, setSidebarItems] = useState<Doc[]>(journal.docs || [])
  const [selectedJournal, setSelectedJournal] = useState<Partial<Journal>>(journal)
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(journal.docs?.length ? journal?.docs[0] : null)

  const editDisabled = useMemo<boolean>(() => user.id !== journal.userId, [user.id, journal.userId])

  let changeCount = 0

  useEffect(() => {
    if (selectedJournal?.publicId?.length) {
      onChangeJournalPublicId(selectedJournal.publicId)
      onSetSharedWithIDs(selectedJournal.sharedWithIDs || [])
    }
  }, [selectedJournal])

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

  // TODO: Use editJournal() ?
  const onJournalTitleChange = (value: string): void => {
    if (!selectedJournal) return
    setSelectedJournal({ ...selectedJournal, title: value })
  }

  const onEditJournal = (value: string): void => {
    if (!selectedJournal) return
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

  const onSidebarItemSelect = (id: string): void => {
    const selected = sidebarItems.find((item) => item.id === id)
    if (!selected) return
    setSelectedDoc(selected)
  }

  const onAddNewDoc = (doc: Doc): void => {
    setSidebarItems([doc, ...sidebarItems])
    setSelectedDoc(doc)
  }

  return (
    <main className="h-screen">
      <Container>
        <div className="flex h-full">
          <Sidebar
            journalId={selectedJournal.id}
            title={selectedJournal.title}
            items={sidebarItems}
            selectedItemId={selectedDoc?.id ?? ''}
            editDisabled={editDisabled}
            onAddNewDoc={onAddNewDoc}
            onItemSelect={onSidebarItemSelect}
            onTitleChange={onJournalTitleChange}
            onTitleBlur={onEditJournal}
          />
          <div className="flex h-full w-2/3 pl-4">
            <ContentEdit
              item={selectedDoc}
              editDisabled={editDisabled}
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

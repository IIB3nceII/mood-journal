import Comment from '@/app/types/entities/comment.model'
import { create } from 'zustand'

type MessagingModalStore = {
  isOpen: boolean
  journalId: string | null
  userId: string | null
  items: Comment[]
  onChangeJournalId: (journalId: string | null) => void
  onChangeUserId: (userId: string | null) => void
  onChangeItems: (items: any[]) => void
  onOpen: () => void
  onClose: () => void
}

const useMessagingModal = create<MessagingModalStore>((set) => ({
  isOpen: false,
  items: [],
  journalId: null,
  userId: null,
  onChangeJournalId: (journalId) => set({ journalId }),
  onChangeUserId: (userId) => set({ userId }),
  onChangeItems: (items) => set({ items }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useMessagingModal

import Comment from '@/app/types/entities/comment.model'
import { create } from 'zustand'

type ChatGPTMessagingModalStore = {
  isOpen: boolean
  journalId: string | null
  items: Comment[]
  onChangeJournalId: (journalId: string | null) => void
  onChangeItems: (items: any[]) => void
  onOpen: () => void
  onClose: () => void
}

const useChatGPTMessagingModal = create<ChatGPTMessagingModalStore>((set) => ({
  isOpen: false,
  items: [],
  journalId: null,
  userId: null,
  onChangeJournalId: (journalId) => set({ journalId }),
  onChangeItems: (items) => set({ items }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useChatGPTMessagingModal

import { create } from 'zustand'

type MessagingModalStore = {
  isOpen: boolean
  journalPublicId: string | null
  onChangeJournalPublicId: (journalPublicId: string) => void
  onOpen: () => void
  onClose: () => void
}

const useMessagingModal = create<MessagingModalStore>((set) => ({
  isOpen: false,
  journalPublicId: null,
  onChangeJournalPublicId: (journalPublicId: string) => set({ journalPublicId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useMessagingModal

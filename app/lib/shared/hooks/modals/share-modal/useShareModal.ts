import { create } from 'zustand'

type ShareModalStore = {
  isOpen: boolean
  journalPublicId: string | null
  sharedWithIDs: string[]
  onChangeJournalPublicId: (journalPublicId: string) => void
  onSetSharedWithIDs: (sharedWithIDs: string[]) => void
  onOpen: () => void
  onClose: () => void
}

const useShareModal = create<ShareModalStore>((set) => ({
  isOpen: false,
  journalPublicId: null,
  sharedWithIDs: [],
  onChangeJournalPublicId: (journalPublicId: string) => set({ journalPublicId }),
  onSetSharedWithIDs: (sharedWithIDs: string[]) => set({ sharedWithIDs }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useShareModal

import { create } from 'zustand'

type ShareModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useShareModal = create<ShareModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useShareModal

import { create } from 'zustand'

type JournalState = {
  journals: Record<string, any[]>[]
}

const useJournalStore = create<JournalState>()((set) => ({
  journals: []
}))

export default useJournalStore

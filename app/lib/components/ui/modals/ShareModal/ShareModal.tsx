'use client'

import { useShareModal } from '@hooks'
import { Button, Input } from '@common'
import { shareJournal } from '@utils'

const ShareModal = () => {
  const { isOpen, onClose } = useShareModal()

  if (!isOpen) return null

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-200 bg-opacity-75" onClick={onClose}>
      <div className="max-h-[75%] max-w-[75%] rounded-lg bg-white p-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex w-screen flex-col lg:w-[35vw]">
          {/* HEADER */}
          <div className="mb-3 flex items-center">
            <h2>Share</h2>
          </div>

          {/* BODY */}
          <div className="flex w-full items-center gap-3">
            <Input />

            <Button label="Share" onClick={() => shareJournal('', '')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal

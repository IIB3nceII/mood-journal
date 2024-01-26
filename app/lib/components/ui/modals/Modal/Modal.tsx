'use client'

import { useShareModal } from '@hooks'
import { ReactNode } from 'react'

type ModalProps = {
  title: string
  children: ReactNode
}

const Modal = ({ title, children }: ModalProps) => {
  const { onClose } = useShareModal()

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-200 bg-opacity-75" onClick={onClose}>
      <div className="max-h-[75%] w-1/2 rounded-2xl bg-white p-8 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex w-full flex-col">
          {/* HEADER */}
          <div className="mb-3 flex items-center">
            <h2>{title}</h2>
          </div>

          {/* BODY */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

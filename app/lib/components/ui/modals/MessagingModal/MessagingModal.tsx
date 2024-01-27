'use client'

import { Modal } from '@components'
import { useMessagingModal } from '@hooks'
import { createComment } from '@utils'
import { useState } from 'react'
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form'

const MessagingModal = () => {
  const { isOpen, journalId, userId, items, onChangeItems, onClose } = useMessagingModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async ({ message }) => {
    if (!message.trim().length || !journalId?.length || !userId?.length) return
    setIsLoading(true)
    const { ok, data } = await createComment(journalId, userId, message)
    setIsLoading(false)
    if (!ok) return
    onChangeItems([...items, data])
    reset()
  }

  const modalBodyContent = (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <div className="flex h-5/6 w-full flex-col gap-3 overflow-y-auto">
        {items.map(({ content }, i) => (
          <div key={i} className="flex items-center text-wrap rounded-lg bg-slate-100 bg-opacity-50 p-4">
            <p className="break-all">{content}</p>
          </div>
        ))}
      </div>
      <form className="flex w-full gap-2 rounded-lg border p-2 focus-within:border-blue-600" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="flex w-full outline-none"
          type="text"
          placeholder="Aa..."
          autoComplete="off"
          disabled={isLoading}
          {...register('message')}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  )

  if (!isOpen) return null

  return <Modal title="Comments" onClose={onClose} children={modalBodyContent} />
}

export default MessagingModal

'use client'

import { useChatGPTMessagingModal } from '@hooks'
import { Modal } from '@components'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { sendMessage } from '@utils'

const ChatGPTMessagingModal = () => {
  const { isOpen, journalId, onClose } = useChatGPTMessagingModal()
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
    if (!message.trim().length || !journalId?.length) return
    setIsLoading(true)
    const res = await sendMessage(message, journalId)
    setIsLoading(false)
  }

  const modalBodyContent = (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

  return <Modal title="Ask AI" onClose={onClose} children={modalBodyContent} />
}

export default ChatGPTMessagingModal

'use client'

import { Modal } from '@components'
import { useChatGPTMessagingModal } from '@hooks'
import { ModelMessage } from '@prisma/client'
import { sendMessage } from '@utils'
import { useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const ChatGPTMessagingModal = () => {
  const { isOpen, journalId, onClose } = useChatGPTMessagingModal()

  const messageListRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<ModelMessage[]>([])

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

  const scrollToBottom = (node: HTMLElement) => node.scroll({ top: node.scrollHeight, behavior: 'smooth' })

  useEffect(() => {
    if (messageListRef.current) {
      scrollToBottom(messageListRef.current)
    }
  }, [messages, messageListRef])

  const onSubmit: SubmitHandler<FieldValues> = async ({ message }) => {
    if (!message.trim().length || !journalId?.length) return
    setIsLoading(true)
    const res = await sendMessage(message, journalId)

    if (res.ok && res.data?.length === 2 && res.data[0]?.content?.length && res.data[1]?.content?.length) {
      setMessages((prev) => [...prev, (res.data as any)[0], (res.data as any)[1]])
    }
    setIsLoading(false)
    reset()
  }

  const modalBodyContent = (
    <div className="flex w-full flex-col">
      <div ref={messageListRef} className="flex h-[300px] flex-col overflow-y-auto">
        {messages.map(({ id, role, content }) => (
          <div key={id} className={`flex items-center py-2 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <p className="max-w-[50%] rounded-lg bg-slate-100 p-2">{content}</p>
          </div>
        ))}
      </div>

      <form className="flex w-full rounded-lg border p-2 focus-within:border-blue-500" onSubmit={handleSubmit(onSubmit)}>
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

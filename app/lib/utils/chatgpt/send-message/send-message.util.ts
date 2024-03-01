import ResponseType from '@/app/types/response-type.model'
import { ModelMessage } from '@prisma/client'

const sendMessage = async (message: string, journalId: string): Promise<ResponseType<[ModelMessage, ModelMessage]>> => {
  try {
    const res = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, journalId })
    })

    const data = await res.json()

    return { ok: true, status: 200, data }
  } catch (err) {
    return { ok: false, status: 500, error: 'Error while generating response.' }
  }
}

export default sendMessage

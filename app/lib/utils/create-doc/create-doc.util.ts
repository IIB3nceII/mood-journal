import Doc from '@/app/types/entities/doc.model'
import ResponseType from '@/app/types/response-type.model'

const createDoc = async (journalId: string): Promise<ResponseType<Doc>> => {
  try {
    const res = await fetch('/api/docs', { method: 'POST', body: JSON.stringify({ journalId }) })

    if (!res.ok) return { ok: false, status: res.status, error: res.statusText }

    const data = await res.json()

    return { ok: true, status: res.status, data }
  } catch (err) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default createDoc

import ResponseType from '@/app/types/response-type.model'
import Journal from '@/app/types/entities/journal.model'

const createJournal = async (): Promise<ResponseType<Journal>> => {
  try {
    const res = await fetch('/api/journals', { method: 'POST' })

    if (!res.ok) return { ok: false, status: res.status, error: res.statusText }

    const data = await res.json()

    return { ok: true, status: res.status, data }
  } catch (err) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default createJournal

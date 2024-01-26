import User from '@/app/types/entities/user.model'
import ResponseType from '@/app/types/response-type.model'

const getJournalComments = async (journalId: string): Promise<ResponseType<Comment[]>> => {
  try {
    const res = await fetch(`/api/comments?journalId=${journalId}`)

    if (!res.ok) return { ok: false, status: res.status, error: res.statusText }

    const data = await res.json()

    return { ok: true, status: 200, data }
  } catch (err) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default getJournalComments

import ResponseType from '@/app/types/response-type.model'

const getJournalComments = async (journalId: string | null | undefined): Promise<ResponseType<Comment[]>> => {
  if (!journalId?.length) return { ok: false, status: 400, error: 'Bad request.' }

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

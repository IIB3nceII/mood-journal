import APIResponse from '@/app/types/api-response.model'
import Journal from '@/app/types/entities/journal.model'

const editJournal = async (journal: Partial<Journal>): Promise<APIResponse<Journal>> => {
  const resObj = { ok: false, status: 400, error: 'Journal object can not be parsed.' }

  try {
    const res = await fetch(`/api/journals/${journal.publicId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(journal)
    })

    const data = await res.json()

    if (!res.ok) return { ok: res.ok, status: res.status, error: data.error }

    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    return resObj
  }
}

export default editJournal

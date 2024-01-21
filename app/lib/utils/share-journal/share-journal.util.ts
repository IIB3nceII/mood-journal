import ResponseType from '@/app/types/response-type.model'

const shareJournal = async (journalPublicId: string, userId: string): Promise<ResponseType> => {
  try {
    const response = await fetch(`/api/journals/share/${journalPublicId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })

    return { ok: response.ok, status: response.status, error: response.statusText }
  } catch (error) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default shareJournal

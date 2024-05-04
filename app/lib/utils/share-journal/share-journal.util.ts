import ResponseType from '@/app/types/response-type.model'

const shareJournal = async (journalPublicId: string, userIDs: string[]): Promise<ResponseType> => {
  try {
    const response = await fetch(`/api/journals/share/${journalPublicId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userIDs })
    })

    const data = await response.json()

    return { ok: response.ok, status: response.status, data, error: response.statusText }
  } catch (error) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default shareJournal

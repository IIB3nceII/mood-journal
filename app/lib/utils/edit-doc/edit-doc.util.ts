import APIResponse from '@/app/types/api-response.model'
import Doc from '@/app/types/entities/doc.model'

const editDoc = async (doc: Partial<Doc>): Promise<APIResponse<Doc>> => {
  const resObj = { ok: false, status: 400, error: 'Doc object can not be parsed.' }

  try {
    const res = await fetch(`/api/docs/${doc.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc)
    })

    const data = await res.json()

    if (!res.ok) return { ok: res.ok, status: res.status, error: data.error }

    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    return resObj
  }
}

export default editDoc

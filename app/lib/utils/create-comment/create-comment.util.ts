import Comment from '@/app/types/entities/comment.model'
import ResponseType from '@/app/types/response-type.model'

const createComment = async (journalId: string, userId: string, content: string): Promise<ResponseType<Comment>> => {
  try {
    const res = await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ journalId, userId, content }) })

    if (!res.ok) return { ok: false, status: res.status, error: res.statusText }

    const data = await res.json()

    return { ok: true, status: res.status, data }
  } catch (err) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default createComment

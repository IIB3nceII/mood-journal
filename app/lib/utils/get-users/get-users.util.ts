import User from '@/app/types/entities/user.model'
import ResponseType from '@/app/types/response-type.model'

const getUsers = async (skip: number = 0, take: number = 30, returnCurrent: boolean = false): Promise<ResponseType<User[]>> => {
  try {
    const res = await fetch(`/api/users?skip=${skip}&take=${take}&returnCurrent=${returnCurrent}`)

    if (!res.ok) return { ok: false, status: res.status, error: res.statusText }

    const data = await res.json()

    return { ok: true, status: 200, data }
  } catch (err) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default getUsers

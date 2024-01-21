import ResponseType from '@/app/types/response-type.model'
import Journal from '@/app/types/entities/journal.model'
import { getCurrentUser } from '..'
import prisma from '@prismadb'

const getJournal = async (): Promise<ResponseType<Journal[]>> => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return { ok: false, status: 401, error: 'Unauthorized.' }

    const journals = await prisma?.journal.findMany({
      where: {
        userId: currentUser.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      ok: true,
      status: 200,
      data: journals?.length
        ? journals.map((item) => ({ ...item, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() }))
        : []
    }
  } catch (err) {
    return { ok: false, status: 500, error: 'Internal server error.' }
  }
}

export default getJournal

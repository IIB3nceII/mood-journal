import prisma from '@prismadb'
import ResponseType from '@/app/types/response-type.model'
import Doc from '@/app/types/entities/doc.model'

const getDocs = async (journalId: string): Promise<ResponseType<Doc[]>> => {
  if (!journalId.length) return { ok: false, status: 400, error: 'Journal ID is required' }

  try {
    const docs = await prisma.doc.findMany({
      where: {
        journalId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!docs?.length) return { ok: true, status: 200, data: [] }

    return {
      ok: true,
      status: 200,
      data: docs.map((doc) => ({ ...doc, createdAt: doc.createdAt.toISOString(), updatedAt: doc.updatedAt.toISOString() }))
    }
  } catch (error) {
    return { ok: false, status: 500, error }
  }
}

export default getDocs

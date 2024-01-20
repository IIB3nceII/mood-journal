import APIResponse from '@/app/types/api-response.model'
import Journal from '@/app/types/entities/journal.model'
import { getCurrentUser, getDocs } from '@actions'
import prisma from '@prismadb'

type ReturnType = Pick<Journal, 'publicId' | 'title' | 'createdAt' | 'updatedAt' | 'docs'>

const getJournal = async (journalId: string | null): Promise<APIResponse<ReturnType>> => {
  const resObj = { ok: false, status: 404, error: 'Journal not found.' } as APIResponse<Journal>

  if (!journalId) return resObj

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return resObj

    const journal = await prisma?.journal.findUnique({
      where: {
        publicId: journalId
      }
    })

    if (!journal) return resObj

    const user = await prisma?.user.findUnique({
      where: {
        id: journal.userId
      }
    })

    if (!user || currentUser.id !== user.id || !journal.sharedWithIDs.every((q) => q !== currentUser.id)) return resObj

    const {data:docs} = await getDocs(journal.id)

    return {
      ok: true,
      status: 200,
      data: {
        ...journal,
        createdAt: journal.createdAt.toISOString(),
        updatedAt: journal.updatedAt.toISOString(),
        docs: docs || []
      }
    }
  } catch (err) {
    return resObj
  }
}

export default getJournal

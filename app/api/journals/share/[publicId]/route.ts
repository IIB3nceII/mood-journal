import { getCurrentUser } from '@/actions'
import prisma from '@prismadb'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request, { params: { publicId } }: { params: { publicId: string } }) => {
  try {
    const { userId } = await req.json()

    const journal = await prisma.journal.findFirst({
      where: {
        publicId
      }
    })

    if (!journal) return NextResponse.error()

    const user = await getCurrentUser()

    if (!user || user.id !== journal.userId || user.id === userId) return NextResponse.error()

    const newIDs = [...journal.sharedWithIDs, userId]

    const newJournal = await prisma.journal.update({
      where: {
        publicId
      },
      data: {
        sharedWithIDs: newIDs
      }
    })

    return NextResponse.json(newJournal)
  } catch (err) {
    return NextResponse.error()
  }
}

import prisma from '@prismadb'
import { getCurrentUser } from '@actions'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const { title, content } = await req.json()

  let journals = [...(currentUser.journals || [])]
  journals.push()

  const user = await prisma.journal.create({
    data: {
      userId: currentUser.id,
      title,
      content,
      isDeleted: false,
      sharedWith: []
    }
  })

  return NextResponse.json(user.journals || [])
}

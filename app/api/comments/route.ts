import prisma from '@prismadb'
import { NextResponse } from 'next/server'

export const GET = async ({ params: { journalId } }: { params: { journalId: string } }) => {
  try {
    if (!journalId?.length) return NextResponse.error()

    const comments = await prisma.comment.findMany({
      where: {
        journalId,
        isDeleted: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(comments)
  } catch (err) {
    return NextResponse.error()
  }
}

export const POST = async (req: Request) => {
  try {
    const { journalId, userId, comment } = await req.json()

    if (!journalId || !userId || !comment) return NextResponse.error()

    const data = await prisma.comment.create({
      data: {
        journalId,
        userId,
        content: comment.content,
        isDeleted: false
      }
    })

    if (!data) return NextResponse.error()

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.error()
  }
}

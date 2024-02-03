import prisma from '@prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const journalId = searchParams.get('journalId')
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
    const { journalId, userId, content } = await req.json()

    if (!journalId?.length || !userId?.length || !content?.length) return NextResponse.error()

    const comment = await prisma.comment.create({
      data: {
        journalId,
        userId,
        content: content.trim(),
        isDeleted: false
      }
    })

    if (!comment) return NextResponse.error()

    return NextResponse.json(comment)
  } catch (err) {
    return NextResponse.error()
  }
}

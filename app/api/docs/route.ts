import prisma from '@prismadb'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { journalId } = await req.json()

    const doc = await prisma.doc.create({
      data: {
        journalId: journalId,
        title: 'Untitled',
        content: '',
        isDeleted: false
      }
    })

    return NextResponse.json(doc)
  } catch (err) {
    return NextResponse.error()
  }
}

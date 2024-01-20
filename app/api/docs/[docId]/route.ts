import prisma from '@prismadb'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request, { params }: { params: { docId: string } }) => {
  try {
    const { docId: id } = params

    const { title, content } = await req.json()

    const doc = await prisma.doc.update({
      where: {
        id
      },
      data: {
        title,
        content
      }
    })

    return NextResponse.json(doc)
  } catch (err) {
    return NextResponse.error()
  }
}

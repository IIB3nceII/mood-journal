import prisma from '@prismadb'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request, { params: { publicId } }: { params: { publicId: string } }) => {
  try {
    const { title } = await req.json()

    const journal = await prisma.journal.update({
      where: {
        publicId
      },
      data: {
        title
      }
    })

    return NextResponse.json(journal)
  } catch (err) {
    return NextResponse.error()
  }
}

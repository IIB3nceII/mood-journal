import { getCurrentUser } from '@actions'
import prisma from '@prismadb'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export const POST = async () => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return NextResponse.error()

    const journal = await prisma.journal.create({
      data: {
        userId: currentUser.id,
        publicId: uuidv4(),
        title: 'Untitled',
        isDeleted: false,
        sharedWithIDs: []
      }
    })

    if (!journal?.id) return NextResponse.error()

    const doc = await prisma.doc.create({
      data: {
        journalId: journal.id,
        title: 'Untitled',
        content: '',
        isDeleted: false
      }
    })

    const obj = { ...journal, docs: [doc] }

    return NextResponse.json(obj)
  } catch (err) {
    NextResponse.error()
  }
}

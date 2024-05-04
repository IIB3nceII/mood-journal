import { CHATGPT_API_KEY, CHATGPT_API_URL, CHATGPT_MAX_TOKENS, DEV_MODE_ACTIVE } from '@config'
import prisma from '@prismadb'
import { NextRequest, NextResponse } from 'next/server'
import DUMMY_RES from './dummy-response.json'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const journalId = searchParams.get('journalId')
    if (!journalId?.length) return NextResponse.error()

    const messages = await prisma.modelMessage.findMany({
      where: {
        journalId,
        isDeleted: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(messages)
  } catch (err) {
    return NextResponse.error()
  }
}

export const POST = async (req: Request) => {
  try {
    const { message, journalId } = await req.json()

    if (!message?.length || !journalId?.length) return NextResponse.error()

    const userMessage = { role: 'user', content: message.trim() }

    const newUserMessage = await prisma.modelMessage.create({
      data: {
        content: userMessage.content,
        role: userMessage.role,
        journalId,
        isDeleted: false
      }
    })

    if (!newUserMessage) return NextResponse.error()

    const obj = {
      model: 'gpt-3.5-turbo',
      messages: [userMessage],
      max_tokens: CHATGPT_MAX_TOKENS?.length ? +CHATGPT_MAX_TOKENS : 150
    }

    let res = null

    if (DEV_MODE_ACTIVE) {
      res = await new Promise((resolve) => setTimeout(() => resolve(DUMMY_RES), 2000))
    } else {
      const q = await fetch(CHATGPT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CHATGPT_API_KEY}`
        },
        body: JSON.stringify(obj)
      })

      res = await q.json()
    }

    const {
      message: { role, content }
    } = res.choices[0]

    if (!content?.length || !role?.length) return NextResponse.error()

    const newModelMessage = await prisma.modelMessage.create({
      data: {
        content,
        role,
        journalId,
        isDeleted: false
      }
    })

    if (!newModelMessage) return NextResponse.error()

    return NextResponse.json([newUserMessage, newModelMessage])
  } catch (err) {
    return NextResponse.error()
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const messageId = searchParams.get('messageId')
    if (!messageId?.length) return NextResponse.error()

    const message = await prisma.modelMessage.update({
      where: {
        id: messageId
      },
      data: {
        isDeleted: true
      }
    })

    return NextResponse.json(message)
  } catch (err) {
    return NextResponse.error()
  }
}

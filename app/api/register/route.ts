import prisma from '@prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const body = await request.json()
  const { email, name, password } = body

  if (!email || !name || !password) {
    return NextResponse.json({ error: 'Invalid credentials!' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { email, name, hashedPassword }
  })

  return NextResponse.json({ user }, { status: 201 })
}

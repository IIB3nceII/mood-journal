import { getCurrentUser } from '@/actions'
import User from '@/app/types/entities/user.model'
import prisma from '@prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const skip = searchParams.get('skip')
    const take = searchParams.get('take')
    const returnCurrent = searchParams.get('returnCurrent')
    const queryString = searchParams.get('query')

    if (!skip?.length || !take?.length || !returnCurrent?.length) return NextResponse.error()

    let users: Record<string, unknown>[] = []

    if (returnCurrent === 'true') {
      users = await prisma.user.findMany({
        skip: +skip,
        take: +take,
        where: {
          isDeleted: false,
          OR: [
            {
              name: {
                contains: queryString || ''
              }
            },
            {
              email: {
                contains: queryString || ''
              }
            }
          ]
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      })
    } else if (returnCurrent === 'false') {
      const currentUser = await getCurrentUser()

      if (!currentUser) return NextResponse.error()

      users = await prisma.user.findMany({
        skip: +skip,
        take: +take,
        where: {
          isDeleted: false,
          OR: [
            {
              name: {
                contains: queryString || ''
              }
            },
            {
              email: {
                contains: queryString || ''
              }
            }
          ],
          id: {
            not: currentUser.id
          }
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      })
    } else {
      return NextResponse.error()
    }

    return NextResponse.json(users || [])
  } catch (err) {
    return NextResponse.error()
  }
}

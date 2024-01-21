import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@prismadb'
import User from '@/app/types/entities/user.model'

export const getSession = async () => await getServerSession(authOptions)

const getCurrentUser = async (): Promise<Omit<User, 'journals' | 'sharedJournals'> | null> => {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) return null

    // @ts-ignore
    if (currentUser.hashedPassword) delete currentUser.hashedPassword

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    }
  } catch (err) {
    return null
  }
}

export default getCurrentUser

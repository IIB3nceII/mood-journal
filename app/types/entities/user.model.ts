import { User as PrismaUser } from '@prisma/client'
import Journal from './journal.model'

type User = Omit<PrismaUser, 'emailVerified' | 'createdAt' | 'updatedAt' | 'journals' | 'sharedJournals'> & {
  emailVerified: string | null
  createdAt: string
  updatedAt: string
  journals: Journal[]
  sharedJournals: Journal[]
}

export default User

import { Journal as PrismaJournal } from '@prisma/client'
import User from './user.model'
import Doc from './doc.model'

type Journal = Omit<PrismaJournal, 'createdAt' | 'updatedAt' | 'owner' | 'sharedWith'> & {
  createdAt: string
  updatedAt: string
  owner?: User
  sharedWith?: User[]
  docs?: Doc[]
}

export default Journal

import { Comment as PrismaComment } from '@prisma/client'
import User from './user.model'

type Comment = Omit<PrismaComment, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  user: Partial<User> | null
}

export default Comment

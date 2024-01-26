import { Comment as PrismaComment } from '@prisma/client'

type Comment = Omit<PrismaComment, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export default Comment
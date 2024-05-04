import { Doc as PrismaDoc } from '@prisma/client'

type Doc = Omit<PrismaDoc, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export default Doc

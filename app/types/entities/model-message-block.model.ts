import { ModelMessageBlock as PrismaModelMessageBlock } from '@prisma/client'

type ModelMessageBlock = Omit<PrismaModelMessageBlock, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export default ModelMessageBlock

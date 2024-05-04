import { JournalStatistic as PrismaJournalStatistic } from '@prisma/client'

export enum Possibility {
  MINIMAL = 'MINIMAL',
  NATURAL = 'NATURAL',
  HIGH = 'HIGH'
}

type JournalStatistic = Omit<PrismaJournalStatistic, 'createdAt' | 'updatedAt'> & {
  possibility: Possibility
  createdAt: string
  updatedAt: string
}

export default JournalStatistic

import { getCurrentUser, getJournal } from '@actions'
import { Container } from '@common'
import { redirect } from 'next/navigation'
import MentalWellbeingJournalClient from './MentalWellbeingJournalClient'
import Journal from '@/app/types/entities/journal.model'

const WellBeingJournalPage = async ({ searchParams }: { [key: string]: string | string[] | undefined }) => {
  const user = await getCurrentUser()
  const { data: journal } = await getJournal(((searchParams as any)?.id as string) || null)

  if (!user || !journal) redirect('/mental-wellbeing')

  return <MentalWellbeingJournalClient user={user} journal={journal as Partial<Journal>} />
}

export default WellBeingJournalPage

import Journal from '@/app/types/entities/journal.model'
import { getCurrentUser, getJournal, getStatistics } from '@actions'
import { redirect } from 'next/navigation'
import MentalWellbeingJournalClient from './MentalWellbeingJournalClient'

const WellBeingJournalPage = async ({ searchParams }: { [key: string]: string | string[] | undefined }) => {
  const user = await getCurrentUser()
  const { data: journal } = await getJournal(((searchParams as any)?.id as string) || null)

  if (!user || !(journal as any)?.id) redirect('/mental-wellbeing')

  const { data } = await getStatistics((journal as any).id)

  if (!data?.length) redirect('/mental-wellbeing')

  return <MentalWellbeingJournalClient user={user} journal={journal as Partial<Journal>} statistics={data} />
}

export default WellBeingJournalPage

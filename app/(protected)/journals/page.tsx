import Journal from '@/app/types/entities/journal.model'
import { getJournal, getCurrentUser } from '@actions'
import JournalClient from './JournalClient'
import { redirect } from 'next/navigation'

export const cache = 'off'

const JournalPage = async ({ searchParams }: { [key: string]: string | string[] | undefined }) => {
  const user = await getCurrentUser()
  const { data: journal } = await getJournal(((searchParams as any)?.id as string) || null)

  if (!user || !journal) redirect('/home')

  return <JournalClient user={user} journal={journal as Partial<Journal>} />
}

export default JournalPage

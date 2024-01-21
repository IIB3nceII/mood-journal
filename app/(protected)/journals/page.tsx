import Journal from '@/app/types/entities/journal.model'
import { getJournal } from '@actions'
import JournalClient from './JournalClient'
import { redirect } from 'next/navigation'

const JournalPage = async ({ searchParams }: { [key: string]: string | string[] | undefined }) => {
  const { data: journal } = await getJournal(((searchParams as any)?.id as string) || null)

  if (!journal) redirect('/home')

  return <JournalClient journal={journal as Partial<Journal>} />
}

export default JournalPage

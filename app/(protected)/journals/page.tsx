import { getJournal } from '@actions'
import JournalClient from './JournalClient'
import Journal from '@/app/types/entities/journal.model'

const JournalPage = async ({ searchParams }: { [key: string]: string | string[] | undefined }) => {
  const journal = await getJournal(((searchParams as any)?.id as string) || null)

  console.log(journal)

  if (!journal) return <div>Journal not found</div>

  return <JournalClient journal={journal as Partial<Journal>} />
}

export default JournalPage

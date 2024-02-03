'use client'

import { getJournalComments, useChatGPTMessagingModal, useMessagingModal } from '@/app/lib'
import Journal from '@/app/types/entities/journal.model'
import User from '@/app/types/entities/user.model'
import { Container } from '@common'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Stats } from 'fs'

type MentalWellbeingJournalClientProps = {
  user: Partial<User>
  journal: Partial<Journal>
  statistics: string | undefined
}

const MentalWellbeingJournalClient = ({ user, journal, statistics }: MentalWellbeingJournalClientProps) => {
  let stats: { illnesses: { illness: string; possibility: string }[] } | undefined | null = null

  try {
    stats = statistics?.length ? JSON.parse(statistics) : null
  } catch (err) {
    return <div>Error while generating statistics.</div>
  }

  const queryClient = useQueryClient()
  const { onOpen, onChangeJournalId, onChangeUserId, onChangeItems } = useMessagingModal()
  const { onOpen: onOpenChatGPTModal, onChangeJournalId: onChangeChatGPTJournalId } = useChatGPTMessagingModal()

  const mutation = useMutation({
    mutationFn: () => getJournalComments(journal.id),
    onSuccess: (res) => {
      if (!journal.id?.length || !user.id?.length) return
      onChangeJournalId(journal.id)
      onChangeUserId(user.id)
      onChangeItems(res.data || [])
      onOpen()
      queryClient.invalidateQueries({ queryKey: ['journal-comments'] })
    }
  })

  const onOpenGPTModal = () => {
    if (!journal.id?.length) return
    onChangeChatGPTJournalId(journal.id)
    onOpenChatGPTModal()
  }

  return (
    <main>
      <Container>
        <section className="mb-8 flex items-center gap-8">
          <div>
            <h1>{journal.title}</h1>
            {stats?.illnesses ? (
              <div>
                {stats.illnesses.map(({ illness, possibility }, i) => (
                  <div key={i} className="flex gap-3">
                    <p>{illness}</p>
                    <p>{possibility}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-blue-400 p-2 text-white" onClick={onOpenGPTModal}>
              Ask AI
            </button>
            <button className="rounded-lg bg-blue-400 p-2 text-white" onClick={() => mutation.mutate()}>
              See comments
            </button>
          </div>
        </section>

        <section>
          {!journal.docs?.length ? (
            <div>No items.</div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {journal.docs.map(({ title, content }, i) => (
                <div key={i} className="flex flex-col items-center rounded-lg border p-4">
                  <div className="flex items-center pr-16">
                    <h2>{title}</h2>
                  </div>
                  <div className="h-48 overflow-y-auto">
                    <p>{content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  )
}

export default MentalWellbeingJournalClient

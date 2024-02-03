'use client'

import { getJournalComments, useChatGPTMessagingModal, useMessagingModal } from '@/app/lib'
import Journal from '@/app/types/entities/journal.model'
import User from '@/app/types/entities/user.model'
import { Container } from '@common'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
        <section className="mb-8 flex">
          <div className="flex w-full justify-between gap-8">
            <div className="flex flex-col gap-3">
              <h1>{journal.title}</h1>
              <div className="flex items-center gap-3">
                <button className="rounded-lg bg-blue-400 p-2 text-white" onClick={onOpenGPTModal}>
                  Ask AI
                </button>
                <button className="rounded-lg bg-blue-400 p-2 text-white" onClick={() => mutation.mutate()}>
                  See comments
                </button>
              </div>
            </div>

            {stats?.illnesses ? (
              <table className="border-collapse border">
                <thead>
                  <tr>
                    <th className="border p-2">Illness</th>
                    <th className="border p-2">Possibility</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.illnesses.map(({ illness, possibility }, i) => (
                    <tr key={i}>
                      <td className="border p-2">{illness}</td>
                      <td className="border p-2 text-center">{possibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </section>

        <section>
          {!journal.docs?.length ? (
            <p>No items.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {journal.docs.map(({ title, content }, i) => (
                <div key={i} className="flex flex-col items-center gap-3 overflow-x-hidden rounded-lg border p-4">
                  <h2 className="w-full truncate">{title}</h2>

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

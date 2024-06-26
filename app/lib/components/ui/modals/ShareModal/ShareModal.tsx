'use client'

import { Button } from '@common'
import { useShareModal } from '@hooks'
import { getUsers, shareJournal } from '@utils'
import { ChangeEvent, useState } from 'react'
import { set } from 'react-hook-form'
import toast from 'react-hot-toast'
import Modal from '../Modal/Modal'

type ResultType = { id: string | null; name: string | null; email: string | null }

const ShareModal = () => {
  const { isOpen, journalPublicId, sharedWithIDs, onClose } = useShareModal()
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<ResultType[]>([])
  const [selected, setSelected] = useState<ResultType[]>([])

  const onQueryChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const {
      target: { value }
    } = e

    setQuery(value)

    if (value.length < 3) return

    const { ok, data } = await getUsers(value)

    if (!ok) {
      toast.error('Something went wrong')
      return
    }

    setResults(data?.filter((q) => !sharedWithIDs.includes(q.id)) || [])
  }

  const onAddUser = (user: ResultType): void => {
    setSelected([...selected, user])
    setQuery('')
    setResults([])
  }

  const onShareJournal = async (): Promise<void> => {
    if (!selected.length) return
    if (!journalPublicId?.length) return

    const ids = selected.filter(({ id }) => id?.length).map(({ id }) => id) as string[]
    const { ok } = await shareJournal(journalPublicId, ids)

    if (!ok) {
      toast.error('Something went wrong')
      return
    }

    toast.success('Journal shared')
    setQuery('')
    setResults([])
    setSelected([])
    onClose()
  }

  const modalBodyContent = (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex w-full items-center gap-3">
        <div className="flex w-4/5 items-center rounded-lg border p-3 transition-all focus-within:border-blue-600">
          {selected.length ? (
            <div className="mr-3 flex w-1/2 flex-wrap gap-2">
              {selected.map(({ name }, i) => (
                <div key={i} className="flex items-center justify-between rounded-full border px-3">
                  <p className="mr-2">{name}</p>
                  <button className="flex h-4 w-4 items-center justify-center rounded-full border">x</button>
                </div>
              ))}
            </div>
          ) : null}
          <input className="w-full outline-none" type="text" placeholder="Search for name or email" value={query} onChange={onQueryChange} />
        </div>

        <div className="flex w-1/5 items-center">
          <Button label="Share" onClick={onShareJournal} />
        </div>
      </div>

      {results.length ? (
        <div className="mt-4 flex w-full flex-col">
          {results.map((user, i) => (
            <div key={i} className="flex w-full items-center">
              <div className="flex w-4/5 flex-col">
                <p className="font-bold">{user.name}</p>
                <span>{user.email}</span>
              </div>
              <div className="flex w-1/5 items-center justify-center">
                <Button label="Add" onClick={() => onAddUser(user)} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )

  if (!isOpen) return null

  return <Modal title="Share" onClose={onClose} children={modalBodyContent} />
}

export default ShareModal

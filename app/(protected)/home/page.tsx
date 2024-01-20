'use client'

import { Button, Container } from '@common'
import { createJournal } from '@utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const UserHomePage = () => {
  const router = useRouter()

  const onCreateJournal = async (): Promise<void> => {
    const res = await createJournal()
    const errorMessage: string = 'Something went wrong during journal creation.'

    if (!res.ok) toast.error(errorMessage)

    if (res.data?.publicId) {
      toast.success('Journal created successfully.')
      router.push(`/journals?id=${res.data.publicId}`)
    } else {
      toast.error(errorMessage)
    }
  }

  return (
    <main>
      <Container>
        <section className="flex items-center justify-between">
          <h1>Journals</h1>

          <div className="flex items-center gap-3">
            <Button label="Create" onClick={onCreateJournal} />
            <button>filter</button>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default UserHomePage

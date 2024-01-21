'use client'

import Journal from '@/app/types/entities/journal.model'
import { Button, Container } from '@common'
import { createJournal } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type HomePageClientProps = {
  journals: Journal[] | undefined
}

const HomePageClient = ({ journals }: HomePageClientProps) => {
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
        <section className="mb-6 flex items-center justify-between">
          <h1>Journals</h1>

          <div className="flex items-center gap-3">
            <Button label="Create" onClick={onCreateJournal} />
            <button>filter</button>
          </div>
        </section>

        {!journals?.length ? (
          <section>No items.</section>
        ) : (
          <section className="flex flex-col">
            {journals.map(({ title, publicId }, i) => (
              <Link key={i} className="flex cursor-pointer rounded-lg p-4 hover:bg-slate-100 hover:bg-opacity-75" href={`/journals?id=${publicId}`}>
                {title}
              </Link>
            ))}
          </section>
        )}
      </Container>
    </main>
  )
}

export default HomePageClient

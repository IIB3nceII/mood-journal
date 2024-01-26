import Journal from '@/app/types/entities/journal.model'
import User from '@/app/types/entities/user.model'
import { Container } from '@common'

type MentalWellbeingJournalClientProps = {
  user: Partial<User>
  journal: Partial<Journal>
}

const MentalWellbeingJournalClient = ({ user, journal }: MentalWellbeingJournalClientProps) => {
  return (
    <main>
      <Container>
        <section className='flex items-center gap-8 mb-8'>
          <h1>{journal.title}</h1>

          <div className='flex items-center gap-3'>
            <button className='bg-blue-400 text-white p-2 rounded-lg'>Ask AI</button>
            <button className='bg-blue-400 text-white p-2 rounded-lg'>See comments</button>
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

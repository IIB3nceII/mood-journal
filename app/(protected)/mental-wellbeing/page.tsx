import { getJournals } from '@actions'
import { Container } from '@common'
import Link from 'next/link'

const MentalWellbeing = async () => {
  const { data: journals } = await getJournals()

  return (
    <main>
      <Container>
        <h1>Journals</h1>

        <section className="flex flex-wrap gap-3">
          {!journals?.length ? (
            <div>No items.</div>
          ) : (
            journals.map(({ title, publicId }, i) => (
              <Link key={i} className="p-2 hover:bg-slate-100 hover:bg-opacity-75" href={`/mental-wellbeing/journal?id=${publicId}`}>
                {title}
              </Link>
            ))
          )}
        </section>
      </Container>
    </main>
  )
}

export default MentalWellbeing

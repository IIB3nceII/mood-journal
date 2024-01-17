'use client'

import { Button, Container } from '@common'
import { createJournal } from '@utils'

const UserHomePage = () => {
  const onCreateJournal = async () => {
    await createJournal({ title: 'test', content: 'test' })
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

const createJournal = async (journal) => {
  const res = await fetch('/api/journal', { method: 'POST', body: JSON.stringify(journal) })

  console.log(res)
}

export default createJournal

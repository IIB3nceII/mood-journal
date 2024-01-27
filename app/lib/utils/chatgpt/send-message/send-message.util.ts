const sendMessage = async (message: string, journalId: string) => {
  try {
    const q = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, journalId })
    })

    const res = await q.json()

    return res
  } catch (err) {
    return null
  }
}

export default sendMessage

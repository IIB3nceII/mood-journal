import ResponseType from '@/app/types/response-type.model'
import { getCurrentUser, getDocs } from '@actions'
import { CHATGPT_API_KEY, CHATGPT_API_URL, CHATGPT_MAX_TOKENS, DEV_MODE_ACTIVE } from '@config'
import DUMMY_RES from './dummy-response.json'

const GET_STATISTIC_PROMPT = `You are a doctor, your response must be in parsable json format! I will give you a text and you must return some possible mental illness with a possibility(Minimal/Natural/High). The JSON format you need to follow: ${JSON.stringify(
  {
    illnesses: [
      {
        illness: 'Grief',
        possibility: 'Not enough info/Minimal/Natural/High'
      },
      {
        illness: 'Depression',
        possibility: 'Not enough info/Minimal/Natural/High'
      },
      {
        illness: 'Post-Traumatic Stress Disorder (PTSD)',
        possibility: 'Not enough info/Minimal/Natural/High'
      }
    ]
  }
)}

The text:`

const MAX_CONTENT_SIZE = 100

const getStatistics = async (journalId: string): Promise<ResponseType<string>> => {
  const errorObj = { ok: false, status: 500, error: 'An error ocurred.' }

  if (!journalId?.length) return { ok: false, status: 400, error: 'Bad request.' }

  try {
    const currentUser = await getCurrentUser()
    const { data: docs } = await getDocs(journalId)

    if (!currentUser || docs === undefined || !docs?.length) return errorObj

    const userMessage = {
      role: 'user',
      content:
        GET_STATISTIC_PROMPT +
        docs
          .map(({ title, content }) => `${title}\n\n${content?.length > MAX_CONTENT_SIZE ? content.slice(0, MAX_CONTENT_SIZE) : content}`)
          .join('\n\n\n')
    }

    const obj = {
      model: 'gpt-3.5-turbo',
      messages: [userMessage],
      max_tokens: CHATGPT_MAX_TOKENS?.length ? +CHATGPT_MAX_TOKENS : 150
    }

    let res = null

    if (DEV_MODE_ACTIVE) {
      res = await new Promise((resolve) => setTimeout(() => resolve(DUMMY_RES), 2000))
    } else {
      const q = await fetch(CHATGPT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CHATGPT_API_KEY}`
        },
        body: JSON.stringify(obj)
      })

      res = await q.json()
    }

    const {
      message: { role, content }
    } = res.choices[0]

    if (!content?.length || !role?.length) return errorObj

    return { ok: true, status: 200, data: content }
  } catch (err) {
    return errorObj
  }
}

export default getStatistics

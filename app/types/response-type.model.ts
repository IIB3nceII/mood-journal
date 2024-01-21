type ResponseType<T = undefined> = {
  ok: boolean
  status: number
  data?: T
  error?: any
}

export default ResponseType

type ResponseType<T = null> = {
  ok: boolean
  status: number
  data?: T
  error?: any
}

export default ResponseType

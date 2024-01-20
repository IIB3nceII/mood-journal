type APIResponse<T = null> = {
  ok: boolean
  status: number
  data?: T
  error?: any
}

export default APIResponse

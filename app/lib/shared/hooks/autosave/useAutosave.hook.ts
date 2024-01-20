import { useEffect, useRef } from 'react'

const useAutosave = (callback: any, delay: number = 1000, deps: any[] = []) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    // @ts-ignore
    const runCallback = () => savedCallback?.current?.()

    const interval = setInterval(runCallback, delay)

    return () => clearInterval(interval)
  }, [delay, ...deps])
}

export default useAutosave

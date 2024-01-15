'use client'

import React, { ReactNode, useEffect, useState } from 'react'

type ClientOnlyProps = {
  children: ReactNode | ReactNode[]
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  /**
   * True if the app is mounted.
   */
  const [hasMounted, setHasMounted] = useState<boolean>(false)

  /**
   * Set hasMounted to true when the app is mounted.
   */
  useEffect(() => setHasMounted(true), [])

  if (!hasMounted) return null

  return <>{children}</>
}

export default ClientOnly

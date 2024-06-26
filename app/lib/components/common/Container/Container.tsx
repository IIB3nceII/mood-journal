import { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode | ReactNode[]
}

const Container = ({ children }: ContainerProps) => (
  <div className="mx-auto h-full w-full max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20">{children}</div>
)

export default Container

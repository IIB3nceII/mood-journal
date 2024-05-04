'use client'

import { Button, Container, Input } from '@common'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const LoginPageClient = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      const res = await signIn('credentials', { ...data, redirect: false })
      setIsLoading(false)
      if (res?.ok) {
        toast.success('Logged in')
        router.push('/home')
      }

      if (res?.error) {
        toast.error('error')
      }
    } catch (err) {
      toast.error('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Container>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" register={() => register('email')} disabled={isLoading} required />
          {errors.email && <p>This field is required</p>}

          <Input label="Password" type="password" register={() => register('password')} disabled={isLoading} required />
          {errors.password && <p>This field is required</p>}
          <Button label="Login" type="submit" disabled={isLoading} />
        </form>
        <Link href="/auth/register">Don't have an account? Register.</Link>
      </Container>
    </main>
  )
}

export default LoginPageClient

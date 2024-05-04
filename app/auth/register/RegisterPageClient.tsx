'use client'

import { Button, Container, Input } from '@common'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const RegisterPageClient = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data) })

      if (!res.ok) toast.error('Registration was not successful.')

      toast.success('Registration was successful.')
      router.push('/home')
    } catch (e) {
      toast.error('Something went wrong during registration.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Container>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" type="text" register={() => register('name')} disabled={isLoading} required />
          {errors.name && <p>This field is required</p>}

          <Input label="Email" type="email" register={() => register('email')} disabled={isLoading} required />
          {errors.email && <p>This field is required</p>}

          <Input label="Password" type="password" register={() => register('password')} disabled={isLoading} required />
          {errors.password && <p>This field is required</p>}
          <Button label="Register" type="submit" disabled={isLoading} />
        </form>
      </Container>
    </main>
  )
}

export default RegisterPageClient

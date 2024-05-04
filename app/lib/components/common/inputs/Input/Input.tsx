import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & { id?: string; label?: string; register?: (args?: any) => any }

const Input = ({ id, label, register, ...rest }: InputProps) => (
  <label htmlFor={id}>
    {label}
    <input id={id} className="border border-black disabled:cursor-not-allowed disabled:opacity-75" {...register?.()} {...rest} />
  </label>
)

export default Input

'use client'

import React, { MouseEvent } from 'react'
import { IconType } from 'react-icons'

interface IButtonProps {
  label?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit'
  outlined?: boolean
  small?: boolean
  icon?: IconType
  iconPosition?: 'left' | 'right'
}

const Button = ({ label, onClick, disabled = false, type = 'button', outlined = false, small, icon: Icon, iconPosition = 'left' }: IButtonProps) => (
  <button
    className={`relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-75 ${
      outlined ? 'border-black bg-white text-black' : 'border-rose-500 bg-rose-500 text-white'
    } ${small ? 'border-[1px] p-1 text-sm font-light' : 'text-md border-2 py-3 font-semibold'}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {Icon && <Icon className="absolute left-4 top-3" size={24} />}
    {label}
  </button>
)

export default Button

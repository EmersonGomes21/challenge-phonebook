import React, { InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string
  name: string
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  dataTestId?: string
  className?: string
  mask?: string | (string | RegExp)[]
  maskChar?: string
}
export const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    required = true,
    dataTestId = props.name,
    className = '',
    mask = '',
    maskChar = ''
  } = props
  return (
    <InputMask
      {...props}
      maskChar={maskChar}
      mask={mask}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      data-testid={dataTestId}
      className={`form-control ${className}`}
    />
  )
}

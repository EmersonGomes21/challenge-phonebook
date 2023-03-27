import React from 'react'

type InputFieldProps = {
  type?: string
  name: string
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  dataTestId?: string
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    required = true,
    dataTestId
  } = props
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      data-testid={dataTestId}
      className="form-control"
    />
  )
}

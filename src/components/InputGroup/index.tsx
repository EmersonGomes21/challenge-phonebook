import React, { ReactNode } from 'react'

type InputGroupProps = {
  icon: string
  children: ReactNode
}

export const InputGroup: React.FC<InputGroupProps> = ({ icon, children }) => {
  return (
    <div className="form-group input-group" data-testid="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text text-larger">
          <i className={icon}></i>
        </div>
      </div>
      {children}
    </div>
  )
}

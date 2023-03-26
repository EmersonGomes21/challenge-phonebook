import React from 'react'
import * as S from './styles'
interface IButtonAdd {
  onClick: () => void
}
const ButtonAdd = ({ onClick }: IButtonAdd) => (
  <S.Wrapper
    data-testid="button-add"
    className="input-group-text"
    onClick={onClick}
  >
    <i className="fas fa-user-plus"></i>
  </S.Wrapper>
)

export { ButtonAdd }

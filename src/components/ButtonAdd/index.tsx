import React from 'react'
import * as S from './styles'
interface IButtonAdd {
  onClick: () => void
}
const ButtonAdd = ({ onClick }: IButtonAdd) => (
  <S.Wrapper className="input-group-text" onClick={onClick}>
    <i class="fas fa-user-plus"></i>
  </S.Wrapper>
)

export { ButtonAdd }
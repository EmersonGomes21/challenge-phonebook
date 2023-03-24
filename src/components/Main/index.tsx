import React from 'react'
// import { createContact, deleteContact, fetchContacts } from 'services/api'

import * as S from './styles'

const Main = ({
  title = 'React Avançado',
  description = 'TypeScript, React, NextJS e Styled Components'
}) => {
  // useEffect(() => {
  //   fetchContacts()
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  //     .catch((error) => console.log(error))
  // }, [])

  return (
    <S.Wrapper>
      <S.Logo
        src="/img/logo.svg"
        alt="Imagem de um átomo e React Avançado escrito ao lado."
      />
      {/* <S.Title
        onClick={async () => {
          await createContact({
            name: 'Caio Carneiro35',
            numbers: ['4831210122'],
            email: 'contato1122@email.com',
            cpf: '77944649005',
            date_born: '2023-03-12'
          })

          // await deleteContact()
        }}
      >
        {title}
      </S.Title> */}
      <S.Description>{description}</S.Description>
      <S.Illustration
        src="/img/hero-illustration.svg"
        alt="Um desenvolvedor de frente para uma tela de código. "
      />
    </S.Wrapper>
  )
}

export default Main

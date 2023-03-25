declare interface ICreateContact {
  name: string
  numbers: string[]
  email: string
  cpf: string
  date_born: string
}

declare interface IResponseCreateContact extends ICreateContact {
  id: number
}

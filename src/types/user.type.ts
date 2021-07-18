export type UserCompany = {
  name: string
  catchPhrase: string
  bs: string
}

export type UserAddresGeolocation = {
  lat: string
  lng: string
}

export type UserAddress = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: UserAddresGeolocation
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: UserAddress
  phone: string
  website: string
  company: UserCompany
}

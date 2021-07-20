import { DetailsHeaderContainer, DetailsTitle, NavIcon, UsersLink } from "./styles"

type DetailsHeaderProps = {
  name: string
}

export function DetailsHeader ({ name }: DetailsHeaderProps): JSX.Element {
  return (
    <DetailsHeaderContainer>
      <UsersLink to="">Users</UsersLink>
      <NavIcon>&gt;</NavIcon>
      <DetailsTitle>{name}</DetailsTitle>
    </DetailsHeaderContainer>
  )
}

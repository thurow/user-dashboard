import { ChangeEvent, useCallback, useMemo, useState } from "react"
import useSWR from "swr"
import { ListHeader } from "./ListHeader"
import { User } from "../../types"
import { UserInList, UserDetailsContainer, NamesContainer, MainContainer, ListSection } from "./styles"
import { AvatarPlaceholder, NormalLink, Typography } from "../../components"

export enum SORT_BY {
  NAME = 'name',
  USERNAME = 'username',
  EMAIL = 'email'
}

export function UserList(): JSX.Element {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.NAME)
  const { data, error } = useSWR<User[]>('users')

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    [],
  )

  const handleSortBy = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as SORT_BY)
    },
    []
  )

  const usersList = useMemo(() => {
    const filteredUsers = data?.filter(u =>
      u.name.toLocaleLowerCase().includes(search) ||
      u.username.toLocaleLowerCase().includes(search) ||
      u.email.toLocaleLowerCase().includes(search)
    ) ?? []

    return filteredUsers.sort((a, b) => {
      if (a[sortBy] < b[sortBy])
        return -1;
      if (a[sortBy] > b[sortBy])
        return 1;
      return 0;
    })
  }, [data, search, sortBy])

  if (error) return <>Error component</>

  return (
    <MainContainer>
      <ListHeader
        search={search}
        handleSearch={handleSearch}
        sortBy={sortBy}
        handleSortBy={handleSortBy}
      />
      <ListSection>
        {usersList.map(u => (
          <UserInList key={u.id}>
            <AvatarPlaceholder />
            <UserDetailsContainer>
              <NamesContainer>
                <Typography>{u.name}</Typography>
                <Typography>{u.username}</Typography>
              </NamesContainer>
              <div>
                <NormalLink href={`mailto:${u.email.toLocaleLowerCase()}`}>{u.email.toLocaleLowerCase()}</NormalLink>
              </div>
            </UserDetailsContainer>
          </UserInList>
        ))}
      </ListSection>
    </MainContainer>
  )
}

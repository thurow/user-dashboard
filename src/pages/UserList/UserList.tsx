import { ChangeEvent, useCallback, useMemo, useState } from "react"
import useSWR from "swr"
import { ListHeader } from "./ListHeader"
import { User } from "@/types"
import { UserInList, UserDetailsContainer, NamesContainer, ListSection } from "./styles"
import {
  AvatarPlaceholder,
  NormalLink,
  Typography,
  MainContainer,
  Alert
} from "@/components"
import { useHistory } from "react-router-dom"
import { useDebounce } from "@/hooks"

export enum SORT_BY {
  NAME = 'name',
  USERNAME = 'username',
  EMAIL = 'email'
}

export function UserList(): JSX.Element {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.NAME)
  const { data, error } = useSWR<User[]>('users')
  const history = useHistory()

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
      u.name.toLocaleLowerCase().includes(debouncedSearch) ||
      u.username.toLocaleLowerCase().includes(debouncedSearch) ||
      u.email.toLocaleLowerCase().includes(debouncedSearch)
    ) ?? []

    return filteredUsers.sort((a, b) => {
      if (a[sortBy] < b[sortBy])
        return -1;
      if (a[sortBy] > b[sortBy])
        return 1;
      return 0;
    })
  }, [data, debouncedSearch, sortBy])

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
        {usersList.length === 0 && (
          <Alert type="info">
            {debouncedSearch.length ? 'No users found with this filter.' : 'No users found'}
          </Alert>
        )}
        {usersList.map(u => (
          <UserInList key={u.id} onClick={() => history.push(`/users/${u.id}`)}>
            <AvatarPlaceholder />
            <UserDetailsContainer>
              <NamesContainer>
                <Typography>{u.name}</Typography>
                <Typography>{u.username}</Typography>
              </NamesContainer>
              <div>
                <NormalLink onClick={(e) => e.stopPropagation()} target="_blank" href={`mailto:${u.email.toLocaleLowerCase()}`}>{u.email.toLocaleLowerCase()}</NormalLink>
              </div>
            </UserDetailsContainer>
          </UserInList>
        ))}
      </ListSection>
    </MainContainer>
  )
}

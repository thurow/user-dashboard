import { ChangeEvent, MouseEvent, MouseEventHandler, useCallback, useMemo, useState } from "react"
import { ListHeader } from "./ListHeader"
import { UserInList, UserDetailsContainer, NamesContainer, ListSection } from "./styles"
import {
  AvatarPlaceholder,
  NormalLink,
  Typography,
  MainContainer,
  Alert
} from "@/components"
import { useHistory } from "react-router-dom"
import { useDebounce, useGetUsers } from "@/hooks"
import { SORT_BY } from "@/types"

export function UserList(): JSX.Element {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.NAME)
  const users = useGetUsers()
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

  /* istanbul ignore next */
  const handleCancelNavigation: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.stopPropagation()
    },
    []
  )

  const usersList = useMemo(() => {
    const filter = debouncedSearch.toLocaleLowerCase()
    const filteredUsers = users.filter(u =>
      u.name.toLocaleLowerCase().includes(filter) ||
      u.username.toLocaleLowerCase().includes(filter) ||
      u.email.toLocaleLowerCase().includes(filter)
    )

    return filteredUsers.sort((a, b) => {
      if (a[sortBy] < b[sortBy])
        return -1;
      /* istanbul ignore next */
      if (a[sortBy] > b[sortBy])
        return 1;
      /* istanbul ignore next */
      return 0;
    })
  }, [users, debouncedSearch, sortBy])

  return (
    <MainContainer>
      <ListHeader
        search={search}
        handleSearch={handleSearch}
        sortBy={sortBy}
        handleSortBy={handleSortBy}
      />
      <ListSection data-testid="user-list-section">
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
                <Typography className="user-name">{u.name}</Typography>
                <Typography>{u.username}</Typography>
              </NamesContainer>
              <div>
                <NormalLink
                  onClick={handleCancelNavigation}
                  target="_blank"
                  href={`mailto:${u.email.toLocaleLowerCase()}`}
                >
                  {u.email.toLocaleLowerCase()}
                </NormalLink>
              </div>
            </UserDetailsContainer>
          </UserInList>
        ))}
      </ListSection>
    </MainContainer>
  )
}

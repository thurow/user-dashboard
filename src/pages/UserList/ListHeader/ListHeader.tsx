import { ChangeEventHandler, memo } from "react"
import { InputField, Label, SelectField } from "@/components"
import { SORT_BY } from "@/pages"
import { ListHeaderContainer, ListOptionsContainer, ListTitle } from "./styles"

type ListHeaderProps = {
  search: string
  handleSearch: ChangeEventHandler<HTMLInputElement>
  sortBy: SORT_BY
  handleSortBy: ChangeEventHandler<HTMLSelectElement>
}

export const ListHeader = memo(({ handleSearch, search, sortBy, handleSortBy }: ListHeaderProps): JSX.Element => {
  return (
    <ListHeaderContainer>
      <ListTitle>Users</ListTitle>
      <ListOptionsContainer>
        <Label htmlFor="search">Search</Label>
        <InputField
          type="search"
          name="search"
          onChange={handleSearch}
          value={search}
          id="search"
        />
      </ListOptionsContainer>
      <ListOptionsContainer>
        <Label htmlFor="sort">Sort By</Label>
        <SelectField name="sort" id="sort" value={sortBy} onChange={handleSortBy}>
          <option value={SORT_BY.NAME}>Name</option>
          <option value={SORT_BY.USERNAME}>Username</option>
          <option value={SORT_BY.EMAIL}>Email</option>
        </SelectField>
      </ListOptionsContainer>
    </ListHeaderContainer>
  )
})

ListHeader.displayName = 'ListHeader'

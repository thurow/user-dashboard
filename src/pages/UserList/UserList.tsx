import useSWR from "swr"
import { fetcher } from "../../services"
import { User } from "../../types"

export function UserList(): JSX.Element {
  const { data, error } = useSWR<User[]>('users', fetcher)

  if (error) return <>Error component</>

  if (!data) return <>Loading component</>

  return <>{JSON.stringify(data)}</>
}

import { User } from "@/types"
import useSWR from "swr"

export function useGetUsers (): User[] {
  const { data } = useSWR<User[]>('users')

  return data ?? []
}

export default useGetUsers

import { User } from "@/types"
import useSWR from "swr"

export function useGetUser (id: string | undefined): User | null {
  const { data } = useSWR(`users/${id}`)

  if (!id) return null

  return data ?? null;
}

export default useGetUser

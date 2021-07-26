import { Post } from "@/types"
import useSWR from "swr"

export function useGetUserPosts (id: string): Post[] {
  const { data } = useSWR<Post[]>(`posts?userId=${id}`)

  return data ?? [];
}

export default useGetUserPosts

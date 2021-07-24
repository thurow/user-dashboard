import useSWR from "swr"
import { H3Typography, Typography } from "@/components"
import { Post } from "@/types"
import { PostArticle, PostsWrapper } from "./styles"

type UserPostsProps = {
  userId: string
}

export function UserPosts({ userId }: UserPostsProps): JSX.Element {
  const { data } = useSWR<Post[]>(`posts?userId=${userId}`)

  return (
    <PostsWrapper>
      {data?.map(post => (
        <PostArticle key={post.id}>
          <H3Typography>{post.title}</H3Typography>
          <Typography>{post.body}</Typography>
        </PostArticle>
      ))}
    </PostsWrapper>
  )
}

import { H3Typography, Typography, Alert } from "@/components"
import { PostArticle, PostsWrapper } from "./styles"
import { useGetUserPosts } from "@/hooks"

type UserPostsProps = {
  userId: string
}

export function UserPosts({ userId }: UserPostsProps): JSX.Element {
  const posts = useGetUserPosts(userId)

  return (
    <PostsWrapper>
      {posts?.length === 0 && <Alert type="info">No posts found from this user.</Alert>}
      {posts?.map(post => (
        <PostArticle key={post.id}>
          <H3Typography>{post.title}</H3Typography>
          <Typography>{post.body}</Typography>
        </PostArticle>
      ))}
    </PostsWrapper>
  )
}

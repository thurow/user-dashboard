import useSWR from "swr"
import { Typography } from "../../../components"
import { Post } from "../../../types"
import { DetailsSection, DetailsWrapper } from "../styles"

type UserPostsProps = {
  userId: string
}

export function UserPosts({ userId }: UserPostsProps): JSX.Element {
  const { data } = useSWR<Post[]>(`posts?userId=${userId}`)

  return (
    <DetailsWrapper>
      {data?.map(post => (
        <DetailsSection key={post.id}>
          <h3>{post.title}</h3>
          <Typography>{post.body}</Typography>
        </DetailsSection>
      ))}
    </DetailsWrapper>
  )
}

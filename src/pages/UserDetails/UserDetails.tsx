import { Suspense } from "react"
import { Redirect, useParams } from "react-router-dom"
import {
  H3Typography,
  MainContainer,
  NormalLink,
  Typography,
  Alert
} from "@/components"
import ErrorBoundary from "@/ErrorBoundary"
import { DetailsHeader } from "./DetailsHeader"
import { DetailsPostSectionTitle, DetailsSection, DetailsWrapper } from "./styles"
import { UserPosts } from "./UserPosts"
import { useGetUser } from "@/hooks"

export function UserDetails (): JSX.Element {
  const { id } = useParams<{ id?: string }>()

  const user = useGetUser(id)

  /* istanbul ignore next */
  if (!id) return <Redirect to="" />

  return (
    <MainContainer>
      <DetailsHeader name={user?.name} />
      <DetailsWrapper>
        <DetailsSection>
          <H3Typography>Contact Info</H3Typography>
          <Typography>Username: {user?.username}</Typography>
          <Typography>Email: <NormalLink target="_blank" href={`mailto:${user?.email}`}>{user?.email}</NormalLink></Typography>
          <Typography>Phone: <NormalLink href={`tel:${user?.phone}`}>{user?.phone}</NormalLink></Typography>
          <Typography>Website: <NormalLink target="_blank" rel="noreferrer noopener" href={`http://${user?.website}`}>{user?.website}</NormalLink></Typography>
        </DetailsSection>
        <DetailsSection>
          <H3Typography>Address</H3Typography>
          <Typography>{user?.address.suite} {user?.address.street}, {user?.address.city}, {user?.address.zipcode}</Typography>
        </DetailsSection>
        <DetailsSection>
          <H3Typography>Company</H3Typography>
          <Typography>{user?.company.name}</Typography>
          <Typography>{user?.company.bs}</Typography>
          <Typography><em>&quot;{user?.company.catchPhrase}&quot;</em></Typography>
        </DetailsSection>
      </DetailsWrapper>
      <DetailsWrapper $isPostsWrapper>
        <DetailsPostSectionTitle>Posts by {user?.name}</DetailsPostSectionTitle>
        <ErrorBoundary fallback={<Alert type="error">Sorry, we won&apos;t be able to get user&apos;s posts</Alert>}>
          <Suspense fallback={<p>Loading posts...</p>}>
            <UserPosts userId={id} />
          </Suspense>
        </ErrorBoundary>
      </DetailsWrapper>
    </MainContainer>
  )
}

import { Suspense } from "react"
import { Redirect, useParams } from "react-router-dom"
import useSWR from "swr"
import { MainContainer, NormalLink, Typography } from "../../components"
import ErrorBoundary from "../../ErrorBoundary"
import { User } from "../../types"
import { DetailsHeader } from "./DetailsHeader"
import { DetailsSection, DetailsWrapper } from "./styles"
import { UserPosts } from "./UserPosts"

export function UserDetails (): JSX.Element {
  const { id } = useParams<{ id?: string }>()

  const { data } = useSWR<User>(`users/${id}`)

  if (!id) return <Redirect to="" />

  return (
    <MainContainer>
      <DetailsHeader name={data?.name ?? ''} />
      <DetailsWrapper>
        <DetailsSection>
          <h3>Contact Info</h3>
          <Typography>Username: {data?.username}</Typography>
          <Typography>Email: <NormalLink href={`mailto:${data?.email}`}>{data?.email}</NormalLink></Typography>
          <Typography>Phone: <NormalLink href={`tel:${data?.phone}`}>{data?.phone}</NormalLink></Typography>
          <Typography>Website: <NormalLink target="_blank" rel="noreferrer noopener" href={`http://${data?.website}`}>{data?.website}</NormalLink></Typography>
        </DetailsSection>
        <DetailsSection>
          <h3>Address</h3>
          <Typography>{data?.address.suite} {data?.address.street}, {data?.address.city}, {data?.address.zipcode}</Typography>
        </DetailsSection>
        <DetailsSection>
          <h3>Company</h3>
          <Typography>{data?.company.name}</Typography>
          <Typography>{data?.company.bs}</Typography>
          <Typography><em>&quot;{data?.company.catchPhrase}&quot;</em></Typography>
        </DetailsSection>
      </DetailsWrapper>
      <h2>Posts by {data?.name}</h2>
      <ErrorBoundary fallback={<h3>Sorry, we won&apos;t be able to get user&apos;s posts</h3>}>
        <Suspense fallback={<p>Loading posts...</p>}>
          <UserPosts userId={id} />
        </Suspense>
      </ErrorBoundary>
    </MainContainer>
  )
}

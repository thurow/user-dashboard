import styled from "styled-components";

type DetailsWrapperProps = {
  $isPostsWrapper?: boolean
}

export const DetailsWrapper = styled.div`
  padding: 1rem;

  @media(min-width: 30rem) {
    border: 0;
    padding: 2rem 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    ${(props: DetailsWrapperProps) =>
      props.$isPostsWrapper && 'display: flex; flex-flow: column;'
    }
  }
`

export const DetailsSection = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media(min-width: 30rem) {
    border: 1px solid darkgray;
  }
`

export const DetailsPostSectionTitle = styled.h2`
  border-top: 1px solid darkgray;
  padding: 4rem 1rem;

  font-size: 2rem;
  font-weight: 600;
  color: #6e6e6e;

  @media(min-width: 30rem) {
    padding: 1rem 0 4rem;
    border-top-color: transparent;
    font-size: 3rem;
  }

  @media(min-width: 50rem) {
    font-size: 4rem;
  }
`

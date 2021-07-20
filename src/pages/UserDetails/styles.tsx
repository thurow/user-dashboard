import styled from "styled-components";

type DetailsWrapperProps = {
  $isPostsWrapper?: boolean
}

export const DetailsWrapper = styled.div`
  padding: 1rem;
  ${(props: DetailsWrapperProps) =>
    props.$isPostsWrapper && 'border-top: 1px solid #6e6e6e;'
  }

  @media(min-width: 30rem) {
    border: 0;
    padding: 2rem 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

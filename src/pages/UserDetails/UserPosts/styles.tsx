import styled from "styled-components";

export const PostsWrapper = styled.div`
  border: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const PostArticle = styled.article`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    border-bottom: 1px solid darkgray;
  }

  @media(min-width: 30rem) {
    border: 1px solid darkgray;
  }
`

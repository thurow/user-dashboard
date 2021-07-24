import styled from 'styled-components'

export const ListHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  gap: 1rem;

  @media(min-width: 1024px) {
    padding: 1rem 0;
  }

  @media(min-width: 30rem) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
`
export const ListTitle = styled.h1`
  font-size: 3rem;
  color: #858585;
  flex: 1;

  @media(min-width: 30rem) {
    font-size: 4rem;
  }
`

export const ListOptionsContainer = styled.div`
  width: 100%;
  max-width: 15rem;
  justify-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: .1rem;

  @media(max-width: 30rem) {
    max-width: 100%;
  }
`

import styled from "styled-components";

export const ListSection = styled.section`
  border-top: 1px solid darkgray;

  @media(min-width: 1024px) {
    border: 1px solid darkgray;
  }
`

export const UserInList = styled.article`
  align-items: center;
  display: flex;
  gap: 1.3rem;
  flex-direction: row;
  padding: 1.5rem;
  width: 100%;
  background-color: #FFF;
  transition: all 300ms ease-in-out;
  cursor: pointer;

  &:nth-child(even) {
    background-color: #f7f6f6;
  }

  &:hover {
    border: 1px solid darkgray;
    transform: scale(1.03)
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid darkgrey;
  }
`

export const UserDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media(min-width: 30rem) {
    gap: 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const NamesContainer = styled.div`
  @media(min-width: 30rem) {
    flex: 1;
  }
`

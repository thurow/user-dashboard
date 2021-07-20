import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components"

export const DetailsHeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem;
  gap: 1rem;
`

const details_css = css`
  font-size: 2rem;
  font-weight: 600;
  color: #6e6e6e;

  @media(min-width: 30rem) {
    font-size: 3rem;
  }
`

export const NavIcon = styled.span`
  ${details_css}
`

export const UsersLink = styled(NavLink)`
  ${details_css}
  color: #0076ff;
  text-decoration: none;
`

export const DetailsTitle = styled.h1`
  ${details_css}
  flex: 1;
`

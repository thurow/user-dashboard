import styled from 'styled-components'

export const Loader = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-content: center;

  &:after {
    content: "";
    width: 10rem;
    height: 10rem;
    animation: rotate 0.8s infinite linear;
    border: 3px solid #555555;
    border-right-color: transparent;
    border-radius: 50%;
    display: block;
    z-index: 99999;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }

  @keyframes rotate {
    0%    { transform: rotate(0deg); }
    100%  { transform: rotate(360deg); }
  }
`

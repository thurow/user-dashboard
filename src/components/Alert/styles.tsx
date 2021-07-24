import styled from "styled-components";

type AlertProps = {
  $type: 'warning' |'error' | 'info'
}

export const AlertContainer = styled.div`
  display: block;
  width: 100%;
  max-width: 102.4rem;
  padding: 1.5rem 2rem;
  margin: 1rem auto;
  border-radius: 4px;
  background-color: ${(props: AlertProps) => {
    switch(props.$type) {
      case 'error':
        return 'rgb(253, 236, 234)';
      case 'warning':
        return 'rgb(255, 244, 229)';
      case 'info':
      default:
        return 'rgb(232, 244, 253)';
    }
  }};

  > * {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    color: ${(props: AlertProps) => {
      switch(props.$type) {
        case 'error':
          return 'rgb(97, 26, 21)';
        case 'warning':
          return 'rgb(102, 60, 0)';
        case 'info':
        default:
          return 'rgb(13, 60, 97)';
      }
    }};
  }
`

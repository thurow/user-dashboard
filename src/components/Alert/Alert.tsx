import { memo, ReactChild } from "react"
import { AlertContainer } from "./styles";

type AlertProps = {
  type: 'warning' | 'error' | 'info'
  component?: keyof JSX.IntrinsicElements
  children: ReactChild
}

export const Alert = memo(({ type, component = 'h3', children }: AlertProps) => {
  const Tag = component as keyof JSX.IntrinsicElements;

  return (
    <AlertContainer $type={type}>
      <Tag>{children}</Tag>
    </AlertContainer>
  )
})

Alert.displayName = 'Alert'

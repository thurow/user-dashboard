import { Alert } from '@/components'
import { render, screen } from '@testing-library/react'

describe('Alert', () => {
  it('should render alert info message', () => {
    const MESSAGE = 'Alert info'
    render(<Alert type="info">{MESSAGE}</Alert>)

    expect(screen.getByText(MESSAGE)).toBeInTheDocument()
    expect(screen.getByText(MESSAGE)).toHaveStyle('color: rgb(13, 60, 97)')
    expect(screen.getByText(MESSAGE).parentNode).toHaveStyle('background-color: rgb(232, 244, 253)')
  })

  it('should render alert warning message', () => {
    const MESSAGE = 'Alert warning'
    render(<Alert type="warning">{MESSAGE}</Alert>)

    expect(screen.getByText(MESSAGE)).toBeInTheDocument()
    expect(screen.getByText(MESSAGE)).toHaveStyle('color: rgb(102, 60, 0)')
    expect(screen.getByText(MESSAGE).parentNode).toHaveStyle('background-color: rgb(255, 244, 229)')
  })

  it('should render alert error message', () => {
    const MESSAGE = 'Alert error'
    render(<Alert type="error">{MESSAGE}</Alert>)

    expect(screen.getByText(MESSAGE)).toBeInTheDocument()
    expect(screen.getByText(MESSAGE)).toHaveStyle('color: rgb(97, 26, 21)')
    expect(screen.getByText(MESSAGE).parentNode).toHaveStyle('background-color: rgb(253, 236, 234)')
  })
})

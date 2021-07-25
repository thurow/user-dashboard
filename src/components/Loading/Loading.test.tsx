import { Loading } from '@/components'
import { screen, render } from '@testing-library/react'

describe('Loading component', () => {
  it('should render loading component', () => {
    const LOADING_TESTID = 'loading-data'
    render(<Loading />)

    expect(screen.getByTestId(LOADING_TESTID)).toBeInTheDocument()
  })
})

import { screen, render } from '@/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { DetailsHeader } from './DetailsHeader'

describe('DetailsHeader', () => {
  it('should render Details header', () => {
    const USER_NAME = 'John Doe'

    render(
      <MemoryRouter>
        <DetailsHeader name={USER_NAME} />
      </MemoryRouter>
    )

    expect(screen.getByText(USER_NAME)).toBeInTheDocument()
  })
})

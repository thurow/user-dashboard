import { render, screen } from '@/test-utils'
import useGetUser from "@/hooks/useGetUser";
import { User } from '@/types';
import { USERS_MOCKED_LIST } from '@/mocks';
import { MemoryRouter, Route } from 'react-router-dom';
import { UserDetails } from './UserDetails';
import { ReactChild } from 'react';

jest.mock("@/hooks/useGetUser");

const renderWithRouter = (children: ReactChild, id: string) => (
  render(
    <MemoryRouter initialEntries={[`/users/${id}`]}>
      <Route path='/users/:id'>
        {children}
      </Route>
    </MemoryRouter>
  )
)

describe('UserDetails', () => {
  const USER = USERS_MOCKED_LIST[0]
  it('should render user details', async () => {
    const mockedUseGetUser = useGetUser as jest.Mock<User>
    mockedUseGetUser.mockImplementation(() => USER);

    renderWithRouter(
      <UserDetails />,
      '1'
    )

    expect(screen.getByText(USER.name)).toBeInTheDocument()
    expect(screen.getByText(`Username: ${USER.username}`)).toBeInTheDocument()
    expect(screen.getByText(USER.email)).toBeInTheDocument()
    expect(screen.getByText(USER.phone)).toBeInTheDocument()
    expect(screen.getByText(USER.website)).toBeInTheDocument()
  })
})

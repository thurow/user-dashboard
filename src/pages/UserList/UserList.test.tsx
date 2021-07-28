import { screen, render, act } from '@/test-utils'
import { createMemoryHistory } from "history";
import userEvent from '@testing-library/user-event'
import useGetUsers from "@/hooks/useGetUsers";
import { SORT_BY, User } from '@/types';
import { UserList } from '.';
import { USERS_MOCKED_LIST } from '@/mocks';
import { Router } from 'react-router-dom';

jest.mock("@/hooks/useGetUsers");

describe('UserList page', () => {
  it('should render users and navigate to a user details', async () => {
    const history = createMemoryHistory();
    const mockedUseGetUsers = useGetUsers as jest.Mock<User[]>
    mockedUseGetUsers.mockImplementation(() => USERS_MOCKED_LIST);

    render(
      <Router history={history}>
        <UserList />
      </Router>
    )

    expect(await screen.findByText(USERS_MOCKED_LIST[0].name)).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText(USERS_MOCKED_LIST[0].email.toLocaleLowerCase())).toBeInTheDocument()
    expect(screen.getByText(USERS_MOCKED_LIST[0].username)).toBeInTheDocument()
    expect(screen.getByText(USERS_MOCKED_LIST[0].email.toLocaleLowerCase())).toHaveAttribute('href', `mailto:${USERS_MOCKED_LIST[0].email.toLocaleLowerCase()}`)

    userEvent.click(screen.getByText(USERS_MOCKED_LIST[0].name))
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe(`/users/${USERS_MOCKED_LIST[0].id}`)
  })
  it('should filter users', async () => {
    const mockedUseGetUsers = useGetUsers as jest.Mock<User[]>
    mockedUseGetUsers.mockImplementation(() => USERS_MOCKED_LIST);

    render(<UserList />)

    expect(await screen.findByText(USERS_MOCKED_LIST[0].name)).toBeInTheDocument()

    expect(screen.getByLabelText("Search")).toBeInTheDocument()
    userEvent.type(screen.getByLabelText("Search"), USERS_MOCKED_LIST[0].name.slice(0, 3))

    act(() => {
      jest.runAllTimers();
    });

    expect(await screen.findByText(USERS_MOCKED_LIST[0].name)).toBeInTheDocument()
    expect(screen.queryByText(USERS_MOCKED_LIST[2].name)).not.toBeInTheDocument()
  })
  it('should sort users', async () => {
    const FIRST_USER_DEFAULT_SORT = USERS_MOCKED_LIST[2]
    const LAST_USER_DEFAULT_SORT = USERS_MOCKED_LIST[0]
    const mockedUseGetUsers = useGetUsers as jest.Mock<User[]>
    mockedUseGetUsers.mockImplementation(() => USERS_MOCKED_LIST);

    render(<UserList />)

    expect(await screen.findByText(USERS_MOCKED_LIST[0].name)).toBeInTheDocument()

    const childrenBeforeSorting = screen.getByTestId("user-list-section").querySelectorAll(".user-name")

    expect(childrenBeforeSorting[0]).toHaveTextContent(FIRST_USER_DEFAULT_SORT.name)
    expect(childrenBeforeSorting[childrenBeforeSorting.length - 1]).toHaveTextContent(LAST_USER_DEFAULT_SORT.name)

    expect(screen.getByLabelText("Sort By")).toBeInTheDocument()
    userEvent.selectOptions(screen.getByLabelText("Sort By"), SORT_BY.EMAIL)

    const childrenAfterSorting = screen.getByTestId("user-list-section").querySelectorAll(".user-name")

    expect(childrenAfterSorting[0]).not.toHaveTextContent(FIRST_USER_DEFAULT_SORT.name)
    expect(childrenAfterSorting[childrenAfterSorting.length - 1]).toHaveTextContent(LAST_USER_DEFAULT_SORT.name)

    userEvent.selectOptions(screen.getByLabelText("Sort By"), SORT_BY.USERNAME)

    const childrenAfterLastSorting = screen.getByTestId("user-list-section").querySelectorAll(".user-name")
    expect(childrenAfterLastSorting[childrenAfterLastSorting.length - 1]).not.toHaveTextContent(LAST_USER_DEFAULT_SORT.name)
  })
  it('should render empty alert message', async () => {
    const mockedUseGetUsers = useGetUsers as jest.Mock<User[]>
    mockedUseGetUsers.mockImplementation(() => []);

    render(<UserList />)

    expect(await screen.findByText('No users found')).toBeInTheDocument()
  })
  it('should render empty alert message after filtering', async () => {
    const mockedUseGetUsers = useGetUsers as jest.Mock<User[]>
    mockedUseGetUsers.mockImplementation(() => USERS_MOCKED_LIST);

    render(<UserList />)

    expect(await screen.findByText(USERS_MOCKED_LIST[0].name)).toBeInTheDocument()

    expect(screen.getByLabelText("Search")).toBeInTheDocument()
    userEvent.type(screen.getByLabelText("Search"), 'NOTHING')

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByText(USERS_MOCKED_LIST[0].name)).not.toBeInTheDocument()
    expect(screen.getByText('No users found with this filter.')).toBeInTheDocument()
  })
})

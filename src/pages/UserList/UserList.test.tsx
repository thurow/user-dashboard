import { screen, render, act, createEvent, fireEvent } from '@/test-utils'
import userEvent from '@testing-library/user-event'
import useGetUsers from "@/hooks/useGetUsers";
import { SORT_BY, User } from '@/types';
import { UserList } from '.';
import { USERS_MOCKED_LIST } from '@/mocks';

jest.mock("@/hooks/useGetUsers");

describe('UserList page', () => {

  it('should render users', async () => {
    const mockedUseGetUsers = useGetUsers as jest.Mock<User[]>
    mockedUseGetUsers.mockImplementation(() => USERS_MOCKED_LIST);

    render(<UserList />)

    expect(await screen.findByText(USERS_MOCKED_LIST[0].name)).toBeInTheDocument()
    expect(screen.getByText(USERS_MOCKED_LIST[0].email.toLocaleLowerCase())).toBeInTheDocument()
    expect(screen.getByText(USERS_MOCKED_LIST[0].username)).toBeInTheDocument()
    expect(screen.getByText(USERS_MOCKED_LIST[0].email.toLocaleLowerCase())).toHaveAttribute('href', `mailto:${USERS_MOCKED_LIST[0].email.toLocaleLowerCase()}`)
  })
  it('should filter users', async () => {
    const mockedUseGetUsers = useGetUsers as jest.Mock<User[]>
    mockedUseGetUsers.mockImplementation(() => USERS_MOCKED_LIST);

    render(<UserList />)

    expect(await screen.findByText(USERS_MOCKED_LIST[0].name)).toBeInTheDocument()

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

    userEvent.selectOptions(screen.getByLabelText("Sort By"), SORT_BY.EMAIL)

    const childrenAfterSorting = screen.getByTestId("user-list-section").querySelectorAll(".user-name")

    expect(childrenAfterSorting[0]).not.toHaveTextContent(FIRST_USER_DEFAULT_SORT.name)
    expect(childrenAfterSorting[childrenAfterSorting.length - 1]).toHaveTextContent(LAST_USER_DEFAULT_SORT.name)

    userEvent.selectOptions(screen.getByLabelText("Sort By"), SORT_BY.USERNAME)

    const childrenAfterLastSorting = screen.getByTestId("user-list-section").querySelectorAll(".user-name")
    expect(childrenAfterLastSorting[childrenAfterLastSorting.length - 1]).not.toHaveTextContent(LAST_USER_DEFAULT_SORT.name)
  })
})

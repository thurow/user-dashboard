import { render, screen } from '@/test-utils'
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { Post } from '@/types';
import { POSTS_MOCK } from '@/mocks';
import { UserPosts } from './UserPosts';

jest.mock("@/hooks/useGetUserPosts");

describe('UserPosts', () => {
  it('should render User posts', async () => {
    const mockeduseGetUserPosts = useGetUserPosts as jest.Mock<Post[]>
    mockeduseGetUserPosts.mockImplementation(() => POSTS_MOCK);

    render(<UserPosts userId="1" />)

    expect(await screen.findByText(POSTS_MOCK[0].title)).toBeInTheDocument()
  })
  it('should render empty alert message when there are no posts', async () => {
    const mockeduseGetUserPosts = useGetUserPosts as jest.Mock<Post[]>
    mockeduseGetUserPosts.mockImplementation(() => []);

    render(<UserPosts userId="1" />)

    expect(await screen.findByText('No posts found from this user.')).toBeInTheDocument()
  })
})

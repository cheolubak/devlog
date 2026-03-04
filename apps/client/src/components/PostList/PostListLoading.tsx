import { PostItemLoading } from 'components';

export const PostListLoading = () => {
  return new Array(20)
    .fill(() => null)
    .map((_, idx) => <PostItemLoading key={`post-item-loading-${idx}`} />);
};

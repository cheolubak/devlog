import { PostItemLoading } from 'components';

export const PostListLoading = () => {
  return Array.from({ length: 10 }, (_, idx) => (
    <PostItemLoading key={`post-item-loading-${idx}`} />
  ));
};

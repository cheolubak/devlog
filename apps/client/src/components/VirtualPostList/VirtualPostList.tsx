import type { PostList } from '@devlog/domains';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { PostListItem } from 'components';

interface VirtualPostListProps {
  postList: PostList[];
}

export const VirtualPostList = ({ postList }: VirtualPostListProps) => {
  'use no memo';

  const rowVirtualizer = useWindowVirtualizer({
    count: postList.length,
    estimateSize: () => 220,
    overscan: 3,
  });

  return (
    <article
      style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const post = postList[virtualItem.index];

        return (
          <PostListItem
            key={post.id}
            post={post}
            style={{
              height: virtualItem.size,
              left: 0,
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualItem.start}px)`,
              width: '100%',
            }}
          />
        );
      })}
    </article>
  );
};

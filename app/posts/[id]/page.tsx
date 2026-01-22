import type { Metadata } from 'next';

import { PostDetail } from '@devlog/components';
import { fetchApi } from '@devlog/request';
import { marked } from 'marked';
import { cache } from 'react';

import { PostList } from '@/packages/domains/PostList';
import { stripHtmlTags } from '@/packages/utils/src/stripHtmlTags';

export const dynamic = 'force-dynamic';

const getPostDetail = cache(async (id: string) => {
  return await fetchApi.get<PostList | PostList[]>(`posts/${id}`, {
    next: {
      revalidate: 86400,
      tags: ['posts'],
    },
  });
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;

  const data = await getPostDetail(id);

  const post: PostList | undefined = Array.isArray(data) ? data.at(0) : data;

  if (!post) {
    return {};
  }

  const htmlString = await marked.parse(post.content);

  return {
    description: `${stripHtmlTags(htmlString).slice(0, 150)}...`,
    openGraph: {
      images: post.thumbnail,
    },
    title: `DEVLOG - ${post.title}`,
  };
};

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getPostDetail(id);

  const post: PostList | undefined = Array.isArray(data) ? data.at(0) : data;

  if (!post) {
    return null;
  }

  return <PostDetail post={post} />;
}

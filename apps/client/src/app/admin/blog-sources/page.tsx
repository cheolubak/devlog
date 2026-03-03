import { getBlogSources } from '@devlog/apis';
import { BlogSourceList } from '@devlog/components';

export default async function BlogSourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  try {
    const { type } = await searchParams;
    const blogSources = await getBlogSources(type);

    return <BlogSourceList blogSources={blogSources} />;
  } catch {
    return null;
  }
}

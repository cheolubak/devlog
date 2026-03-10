import { getBlogSources } from 'apis';
import { BlogSourceList } from 'components';

export const dynamic = 'force-dynamic';

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

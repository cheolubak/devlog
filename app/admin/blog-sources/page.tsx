import { getBlogSources } from '@devlog/apis';
import { BlogSourceList } from '@devlog/components';

export default async function BlogSourcesPage() {
  try {
    const blogSources = await getBlogSources();

    return <BlogSourceList blogSources={blogSources} />;
  } catch {
    return null;
  }
}

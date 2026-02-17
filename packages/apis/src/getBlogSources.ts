import type { BlogSource } from '@devlog/domain';

import { fetchApi } from '@devlog/request';

export const getBlogSources = () => {
  return fetchApi.get<BlogSource[]>('/admin/blog-sources');
};

import type { BlogSource } from '@devlog/domain';

import { fetchApi } from '@devlog/request';

export const getBlogSources = (type: string) => {
  return fetchApi.get<BlogSource[]>('/admin/blog-sources', {
    params: { type },
  });
};

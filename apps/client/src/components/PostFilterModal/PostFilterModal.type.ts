export const POST_REGION_FILTERS = [
  { value: 'ALL' },
  { value: 'KOREA' },
  { value: 'FOREIGN' },
] as const;

export const POST_TYPE_FILTERS = [
  { value: 'ALL' },
  { value: 'BLOG' },
  { value: 'YOUTUBE' },
] as const;

export type PostRegionFilter = (typeof POST_REGION_FILTERS)[number]['value'];
export type PostTypeFilter = (typeof POST_TYPE_FILTERS)[number]['value'];

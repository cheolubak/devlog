export const POST_REGION_FILTERS = [
  { name: '전체', value: 'ALL' },
  { name: '국내', value: 'KOREA' },
  { name: '국외', value: 'FOREIGN' },
] as const;

export const POST_TYPE_FILTERS = [
  { name: '전체', value: 'ALL' },
  { name: 'RSS 블로그', value: 'BLOG' },
  { name: '유튜브', value: 'YOUTUBE' },
] as const;

export type PostRegionFilter = (typeof POST_REGION_FILTERS)[number]['value'];
export type PostTypeFilter = (typeof POST_TYPE_FILTERS)[number]['value'];

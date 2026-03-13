export const POST_REGION_FILTERS = [
  { enName: 'All', name: '전체', value: 'ALL' },
  { enName: 'Korean', name: '국내', value: 'KOREA' },
  { enName: 'English', name: '국외', value: 'FOREIGN' },
] as const;

export const POST_TYPE_FILTERS = [
  { enName: 'All', name: '전체', value: 'ALL' },
  { enName: 'RSS Blog', name: 'RSS 블로그', value: 'BLOG' },
  { enName: 'Youtube', name: '유튜브', value: 'YOUTUBE' },
] as const;

export type PostRegionFilter = (typeof POST_REGION_FILTERS)[number]['value'];
export type PostTypeFilter = (typeof POST_TYPE_FILTERS)[number]['value'];

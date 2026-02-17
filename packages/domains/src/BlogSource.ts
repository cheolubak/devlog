export interface BlogSource {
  blogUrl: string;
  createdAt: string;
  icon: string;
  id: string;
  isActive: true;
  lastFetchedAt: string;
  lastFetchError: string;
  lastFetchStatus: 'FAILED' | 'SUCCESS';
  name: string;
  scrapingConfig: null;
  totalPostsFetched: number;
  type: 'ATOM' | 'RSS' | 'SCRAPING' | 'YOUTUBE';
  updatedAt: string;
  url: string;
}

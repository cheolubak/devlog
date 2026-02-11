export interface ResponseList<T> {
  data: T[];
  pagination: {
    hasMore: boolean;
    limit: number;
    offset: number;
    total: number;
  };
}

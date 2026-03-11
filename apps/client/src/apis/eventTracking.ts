import { fetchApi } from '@devlog/request';

export const eventTracking = (
  eventName: string,
  params?: Record<string, string>,
) => {
  return fetchApi.post(`/event`, { eventName, params });
};

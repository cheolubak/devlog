import type { User } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryFn: () => fetchApi.get<User>('/me'),
    queryKey: ['user'],
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => fetchApi.delete('/logout'),
    mutationKey: ['logout'],
    onMutate: () => {
      queryClient.setQueryData(['user'], null);
    },
  });

  const { mutate: leave } = useMutation({
    mutationFn: () => fetchApi.post('/leave'),
    mutationKey: ['logout'],
    onMutate: () => {
      queryClient.setQueryData(['user'], null);
    },
  });

  return { isLogin: !!user, leave, logout, user };
};

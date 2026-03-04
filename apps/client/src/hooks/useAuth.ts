import type { User } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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
    mutationFn: () => fetchApi.delete('/leave'),
    mutationKey: ['logout'],
    onMutate: () => {
      queryClient.setQueryData(['user'], null);
    },
    onSuccess: () => {
      logout();

      router.replace('/');
    },
  });

  return { isLogin: !!user, leave, logout, user };
};

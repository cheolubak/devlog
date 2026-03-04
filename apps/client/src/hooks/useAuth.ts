import type { User } from '@devlog/domains';

import { useLoading } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { hide, show } = useLoading();

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
      show('leave');
      queryClient.setQueryData(['user'], null);
    },
    onSettled: () => {
      hide('leave');
    },
    onSuccess: () => {
      logout();

      router.replace('/');
    },
  });

  return { isLogin: !!user, leave, logout, user };
};

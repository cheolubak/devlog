import { fetchApi } from '@devlog/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: isLogin } = useQuery({
    queryFn: () =>
      fetchApi
        .get<{ isLogin: boolean }>('/is-login')
        .then((res) => res.isLogin),
    queryKey: ['isLogin'],
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => fetchApi.delete('/logout'),
    mutationKey: ['logout'],
    onMutate: () => {
      queryClient.setQueryData(['isLogin'], false);
    },
  });

  return { isLogin, logout };
};

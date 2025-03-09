import { queryOptions } from '@tanstack/react-query';
import axios from 'redaxios';

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export const usersQueryOptions = (page: number, pageSize = 10) =>
  queryOptions({
    queryKey: ['users', page, pageSize],
    queryFn: () =>
      axios
        .get<Array<User>>('https://gorest.co.in/public/v2/users?page=' + page + '&per_page=' + pageSize)
        .then(r => {
          const total = Number(r.headers.get('x-pagination-total')) || r.data.length;

          return { data: r.data, total };
        })
        .catch(() => {
          throw new Error('Failed to fetch users');
        }),
  });

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: () =>
      axios
        .get<User>('https://gorest.co.in/public/v2/users/' + id)
        .then(r => r.data)
        .catch(() => {
          throw new Error('Failed to fetch user');
        }),
  });

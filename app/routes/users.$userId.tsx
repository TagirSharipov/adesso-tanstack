import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorComponent, Link, createFileRoute } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { NotFound } from '~/components/NotFound';

import { userQueryOptions } from '~/utils/users';

export const Route = createFileRoute('/users/$userId')({
  loader: async ({ context, params: { userId } }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(userId));
  },
  errorComponent: UserErrorComponent,
  component: UserComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  },
});

export function UserErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function UserComponent() {
  const params = Route.useParams();
  const { t } = useTranslation();
  const userQuery = useSuspenseQuery(userQueryOptions(params.userId));

  const user = userQuery.data;

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{user.name}</h4>
      <div className="text-sm">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="text-sm">
        <strong>Gender:</strong> {user.gender}
      </div>
      <div className="text-sm">
        <strong>Status:</strong> {user.status}
      </div>

      <div className="mt-3">
        {' '}
        <Link to="/users" className="mt-5">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">{t('back')}</button>
        </Link>
      </div>
    </div>
  );
}

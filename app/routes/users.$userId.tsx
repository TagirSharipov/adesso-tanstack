import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorComponent, Link, createFileRoute } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { Button } from 'primereact/button';
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
  const userQuery = useSuspenseQuery(userQueryOptions(params.userId));

  const user = userQuery.data;

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{user.name}</h4>
      <div className="text-sm">{user.email}</div>
      <div className="text-sm">{user.gender}</div>
      <div className="text-sm">{user.status}</div>
      <Link to="/users">
        <Button link label="Back" />
      </Link>
    </div>
  );
}

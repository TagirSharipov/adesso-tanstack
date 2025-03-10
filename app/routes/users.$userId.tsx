import { ErrorComponent, Link, createFileRoute } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Suspense } from 'react';
import { NotFound } from '~/components/NotFound';
import User from '~/components/User';

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
  return (
    <Suspense
      fallback={
        <div className="card flex justify-content-center">
          <ProgressSpinner />
        </div>
      }
    >
      <User userId={params.userId} />
    </Suspense>
  );
}

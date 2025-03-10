import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import UserTable from '~/components/UserTable';
import { ProgressSpinner } from 'primereact/progressspinner';
export const Route = createFileRoute('/users/')({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  return (
    <Suspense
      fallback={
        <div className="card flex justify-content-center">
          <ProgressSpinner />
        </div>
      }
    >
      <UserTable />
    </Suspense>
  );
}

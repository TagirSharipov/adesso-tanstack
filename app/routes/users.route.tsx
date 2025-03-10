import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/users')({
  component: UsersLayoutComponent,
});

function UsersLayoutComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

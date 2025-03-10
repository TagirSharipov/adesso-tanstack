import { Link } from '@tanstack/react-router';
import { User } from '../utils/users';
import { Button } from 'primereact/button';

interface UserTableIdCellProps {
  user: User;
}

export default function UserTableIdCell({ user }: UserTableIdCellProps) {
  return (
    <Link
      to="/users/$userId"
      params={{
        userId: String(user.id),
      }}
    >
      <Button link label={String(user.id)} />
    </Link>
  );
}

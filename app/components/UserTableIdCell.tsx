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
      className="block py-1 text-blue-800 hover:text-blue-600"
    >
      <Button link label={String(user.id)} />
    </Link>
  );
}

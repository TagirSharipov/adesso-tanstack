import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

import { userQueryOptions } from '~/utils/users';

export default function User({ userId }: { userId: string }) {
  const { t } = useTranslation();
  const userQuery = useSuspenseQuery(userQueryOptions(userId));

  const user = userQuery.data;

  return (
    <div>
      <h4>{user.name}</h4>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Gender:</strong> {user.gender}
      </div>
      <div>
        <strong>Status:</strong> {user.status}
      </div>

      <div style={{ marginTop: 20 }}>
        {' '}
        <Link to="/users">
          <Button label={t('back')} />
        </Link>
      </div>
    </div>
  );
}

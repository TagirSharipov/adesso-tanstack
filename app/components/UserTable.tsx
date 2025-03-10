import { useSuspenseQuery } from '@tanstack/react-query';
import { User, usersQueryOptions } from '../utils/users';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { useState } from 'react';
/* import { FilterMatchMode } from 'primereact/api'; */
import usePaginator from '~/hooks/usePaginator';
import { Paginator } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';
import UserTableIdCell from './UserTableIdCell';
import { Filter } from './UserTableFilter';

export default function UserTable() {
  const { first, pageSize, onPageChange } = usePaginator();
  const usersQuery = useSuspenseQuery(usersQueryOptions(Math.floor(first / pageSize) + 1, pageSize));
  const [filters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: 'contains' },
    id: { value: null, matchMode: 'contains' },
    email: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'equals' },
    gender: { value: null, matchMode: 'equals' },
  });

  const { t } = useTranslation();

  const idBodyTemplate = (user: User) => {
    return <UserTableIdCell user={user} />;
  };

  const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Filter
        filterApplyCallback={options.filterApplyCallback}
        value={options.value}
        options={['active', 'inactive']}
      />
    );
  };
  const genderRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Filter filterApplyCallback={options.filterApplyCallback} value={options.value} options={['male', 'female']} />
    );
  };

  return (
    <div className="p-2 ">
      <DataTable value={usersQuery.data.data} rows={10} dataKey="id" filters={filters} filterDisplay="row">
        <Column field="id" header={t('id')} filter filterPlaceholder={t('Search by id')} body={idBodyTemplate} />
        <Column field="name" header={t('name')} filter filterPlaceholder={t('Search by name')} />
        <Column field="email" header={t('email')} filter filterPlaceholder={t('Search by email')} />
        <Column
          field="gender"
          header={t('gender')}
          filter
          filterElement={genderRowFilterTemplate}
          showFilterMenu={false}
        />

        <Column
          field="status"
          header={t('status')}
          filter
          filterElement={statusRowFilterTemplate}
          showFilterMenu={false}
        />
      </DataTable>
      <Paginator
        first={first}
        rows={pageSize}
        totalRecords={usersQuery.data.total}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />
    </div>
  );
}

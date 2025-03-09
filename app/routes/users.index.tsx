import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { User, usersQueryOptions } from '../utils/users';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import usePaginator from '~/hooks/usePaginator';
import { Paginator } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';
export const Route = createFileRoute('/users/')({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  const { first, pageSize, onPageChange } = usePaginator();
  const usersQuery = useSuspenseQuery(usersQueryOptions(Math.floor(first / pageSize) + 1, pageSize));
  const [filters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    gender: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const { t } = useTranslation();

  const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={['active', 'inactive']}
        onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder={t('Select One')}
        className="p-column-filter"
        showClear
        style={{ minWidth: '12rem' }}
      />
    );
  };
  const genderRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={['male', 'female']}
        onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder={t('Select One')}
        className="p-column-filter"
        showClear
        style={{ minWidth: '12rem' }}
      />
    );
  };
  const idBodyTemplate = (user: User) => {
    return (
      <Link
        to="/users/$userId"
        params={{
          userId: String(user.id),
        }}
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        <div>{user.id}</div>
      </Link>
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

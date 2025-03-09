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

export const Route = createFileRoute('/users')({
  component: UsersLayoutComponent,
});

function UsersLayoutComponent() {
  return (
    <div className="p-2 ">
      <Outlet />
    </div>
  );
}

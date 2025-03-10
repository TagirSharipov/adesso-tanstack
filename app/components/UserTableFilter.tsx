import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';

interface UserTableFilterProps {
  filterApplyCallback: ColumnFilterElementTemplateOptions['filterApplyCallback'];
  value: any;
}

export function StatusFilter({ filterApplyCallback, value }: UserTableFilterProps) {
  const { t } = useTranslation();

  return (
    <Dropdown
      value={value}
      options={['active', 'inactive']}
      onChange={(e: DropdownChangeEvent) => filterApplyCallback(e.value)}
      placeholder={t('Select One')}
      className="p-column-filter"
      showClear
      style={{ minWidth: '12rem' }}
    />
  );
}

export function GenderFilter({ filterApplyCallback, value }: UserTableFilterProps) {
  const { t } = useTranslation();
  return (
    <Dropdown
      value={value}
      options={['male', 'female']}
      onChange={(e: DropdownChangeEvent) => filterApplyCallback(e.value)}
      placeholder={t('Select One')}
      className="p-column-filter"
      showClear
      style={{ minWidth: '12rem' }}
    />
  );
}

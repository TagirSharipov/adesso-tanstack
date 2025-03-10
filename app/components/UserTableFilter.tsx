import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';

interface UserTableFilterProps {
  filterApplyCallback: ColumnFilterElementTemplateOptions['filterApplyCallback'];
  value: any;
  options: string[];
}

export function Filter({ filterApplyCallback, value, options }: UserTableFilterProps) {
  const { t } = useTranslation();

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={(e: DropdownChangeEvent) => filterApplyCallback(e.value)}
      placeholder={t('Select One')}
      className="p-column-filter"
      showClear
      style={{ minWidth: '12rem' }}
    />
  );
}
